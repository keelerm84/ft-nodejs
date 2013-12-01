var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var SettingsController = new Controller();

SettingsController.index = function() {
  this.render('', { layout: false });
};

module.exports = SettingsController;
