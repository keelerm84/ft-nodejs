var Settings = require('./settings');

var Consumer = function(settings) {
  this.settings = settings;
  this.links = {'ft:home' : { href: this.settings.host }};
};

Consumer.prototype.get = function(name) {
  if (!this.links.hasOwnProperty(name)) {
    throw "Invalid link specified.";
  }

  return this.links[name];
};

Consumer.prototype.set = function(name, link) {
  if (this.links.hasOwnProperty(name)) {
    return;
  }

  link.href = this.settings.host + '/' + link.href;
  this.links[name] = link;
};

module.exports = new Consumer(new Settings());
