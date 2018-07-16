var controller = require('../controller/deviceController');
var logging  = require('../commons/logging');

module.exports = {
  configure: function (app) {
         app.route('/device/:action')
             .post(function (req, res) {
                if (req.params.action == 'insert') {
                    controller.insert(req, res)
                } 
                 if (req.params.action == 'update') {
                    controller.update(req, res)
                }
         })
          .get(function (req, res) {
              if (req.params.action == 'getDeviceInfo') {
                    controller.getDeviceInfo(req, res)
               }
             if (req.params.action == 'getDeviceInfoByUserId') {
                    controller.getDeviceInfoByUserId(req, res)
              } 

         });
    }
}