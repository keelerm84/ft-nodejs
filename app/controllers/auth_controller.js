var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var AuthController = new Controller();

AuthController.login = function() {
  this.render('', { layout: false });
};

module.exports = AuthController;
