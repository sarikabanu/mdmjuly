var controller = require('../controller/loginController');
var logging  = require('../commons/logging');

module.exports = {
  configure: function (app) {
         app.route('/login/:action')
             .post(function (req, res) {
                if (req.params.action == 'userRegistration') {
                    controller.userRegistration(req, res)
                } 
               if (req.params.action == 'userLogin') {
                    controller.userLogin(req, res)
               }
          });
     }
}