var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , Fetch = require('../models/fetch')
  , Settings = require('../models/settings');

var MainController = new Controller();

MainController.index = function() {
  var settings = new Settings();
  var fetch = new Fetch(settings.publicKey, settings.privateKey);
  var that = this;

  fetch.get('ft:search', {term: '12 Angry Men'}, function(error, response) {
    if(error) throw error;

    that.render();
  });
};

MainController.about = function() {
  this.render();
};

module.exports = MainController;
