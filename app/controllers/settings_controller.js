var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var SettingsController = new Controller();

SettingsController.index = function() {
  this.render();
};

module.exports = SettingsController;
