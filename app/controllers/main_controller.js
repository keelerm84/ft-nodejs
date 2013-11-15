var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , Fetch = require('../models/fetch')
  , Settings = require('../models/settings');

var MainController = new Controller();

MainController.index = function() {
  var searchTerm = this.param('term');

  if (!searchTerm) {
    this.render();
    return;
  }

  var settings = new Settings();
  var fetch = new Fetch(settings.publicKey, settings.privateKey);
  var that = this;

  fetch.get('ft:search', {term: searchTerm}, function(error, response) {
    if(error) throw error;

    this.results = response.body._links["ft:torrent"];

    that.render();
  });
};

MainController.about = function() {
  this.render();
};

module.exports = MainController;
