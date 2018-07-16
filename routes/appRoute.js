var controller = require('../controller/appController');
var logging  = require('../commons/logging');

module.exports = {
  configure: function (app) {
         app.route('/app/:action')
             .post(function (req, res) {
                if (req.params.action == 'insert') {
                    controller.insert(req, res)
                } 
                if (req.params.action == 'appAction') {//app install,uninstall,lock
                        controller.appAction(req, res)
                } 
            })
           .get(function (req, res) {
            if (req.params.action == 'getAppInfo') {
                    controller.getAppInfo(req, res)
             }
            if (req.params.action == 'getAppInfoByDeviceId') {
                    controller.getAppInfoByDeviceId(req, res)
            }
            if (req.params.action == 'getAppInfoByAppId') {
                    controller.getAppInfoByAppId(req, res)
            } 

         });
    }
}