var locomotive = require('locomotive')
, Controller = locomotive.Controller
, Fetch = require('../models/fetch')
, Settings = require('../models/settings');

var MainController = new Controller();

MainController.index = function() {
  var searchTerm = this.param('term');

  if ("undefined" == typeof(searchTerm) || !searchTerm) {
    this.render('', { layout: false });
    return;
  }

  var settings = new Settings();
  var fetch = new Fetch(settings.publicKey, settings.privateKey);
  var self = this;

  fetch.get('ft:search', {term: searchTerm}, function(error, response) {
    if(error) throw error;

    this.results = response.body._links["ft:torrent"];

    self.render('', { layout: false });
  });
};

MainController.download = function() {
  var target = this.param('target');

  if ("undefined" == typeof(target) || !target) {
    this.res.send(400, { message: 'You must specify a target to download' });
    return;
  }

  var settings = new Settings();
  var fetch = new Fetch(settings.publicKey, settings.privateKey);
  var self = this;

  fetch.put('ft:torrent', {}, {"target": target}, function(error, response) {
    if(error) throw error;

    self.res.send(200, { message: 'Download Triggered' });
  });
};

MainController.about = function() {
  this.render('', { layout: false });
};

module.exports = MainController;
