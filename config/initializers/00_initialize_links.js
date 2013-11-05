var Fetch = require('../../app/models/fetch')
  , Settings = require('../../app/models/settings');

module.exports = function(done) {
  var settings = new Settings();
  var fetch = new Fetch(settings.publicKey, settings.privateKey);

  fetch.get('ft:home', {}, function(error, response) {
    done();
  });
};
