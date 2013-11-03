var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var MainController = new Controller();

MainController.index = function() {
  this.title = 'Locomotive';
  this.render();
};

MainController.about = function() {
  this.render();
};

module.exports = MainController;
