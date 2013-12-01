var superagent = require('superagent')
  , crypto = require('crypto')
  , consumer = require('./consumer');

var Fetch = function(publicKey, privateKey) {
  this.publicKey = publicKey;
  this.privateKey = privateKey;
  this.consumer = consumer;
};

Fetch.prototype.createDigest = function(timestamp, body) {
  var hmac = crypto.createHmac("sha256", this.privateKey);

  return hmac.update(this.publicKey + timestamp + body).digest('hex');
};

Fetch.prototype.signResponse = function(response, content) {
  var request_time = new Date().getTime();

  response.set('X-Public-Key', this.publicKey)
    .set('X-Request-Timestamp', request_time)
    .set('X-Content-Hash', this.createDigest(request_time, content));

  return response;

};

Fetch.prototype.resolvePath = function(path, templates) {
  var link = this.consumer.get(path);

  if ( !link.hasOwnProperty("templated") || !link.templated ) {
    return link.href;
  }

  var url = link.href;
  for (var prop in templates) {
    url = url.replace('{?' + prop + '}', templates[prop]);
  }

  return url;
};

Fetch.prototype.get = function(path, templates, callback) {
  var url = this.resolvePath(path, templates);
  var response = superagent.agent().get(url);
  var that = this;

  this.signResponse(response, '')
    .end(function(error, response) {
      if (error || response.status != 200) {
        return callback(error);
      }

      that.updateConsumerLinks(response);

      return callback(null, response);
    });
};

Fetch.prototype.put = function(path, templates, body, callback) {
  var url = this.resolvePath(path, templates);
  var response = superagent.agent().put(url);
  var that = this;

  this.signResponse(response, JSON.stringify(body))
    .type('json')
    .send(body)
    .end(function(error, response) {
      if (error || response.status != 200) {
        return callback(error);
      }

      that.updateConsumerLinks(response);

      return callback(null, response);
    });
};

Fetch.prototype.updateConsumerLinks = function(response) {
  var body = response.body;

  if (!body.hasOwnProperty("_links") || 0 == body._links.length) {
    return;
  }

  var links = body._links;

  if (!links.hasOwnProperty("curies")) {
    return;
  }

  var curie = links.curies[0].name;

  for (var prop in links) {
    if (-1 == prop.indexOf(curie + ":")) {
      continue;
    }

    this.consumer.set(prop, links[prop]);
  }
};

module.exports = Fetch;
