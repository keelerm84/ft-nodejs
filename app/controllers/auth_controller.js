var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var AuthController = new Controller();

AuthController.login = function() {
  this.render();
};

module.exports = AuthController;
