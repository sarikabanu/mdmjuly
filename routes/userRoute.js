var controller = require('../controller/userController');
var logging = require('../commons/logging');
var upload = require('../commons/azureUpload').propic
var upload1 = multer()

module.exports = {
      configure: function (app) {
            app.route('/user/:action/')
                  .post(function (req, res) {
                        if (req.params.action == 'userUpdate') {
                              controller.userUpdate(req, res)
                        }
                        if (req.params.action == 'userTokenUpdate') {
                              controller.userTokenUpdate(req, res)
                        }
                  })
                  .get(function (req, res) {
                        if (req.params.action == 'getUserInfo') {
                              controller.getUserInfo(req, res)
                        }
                        if (req.params.action == 'getUserInfoByUserId') {
                              controller.getUserInfoByUserId(req, res)
                        }
                  });

            app.post('/uploadProfileImageofUser', upload1.fields([{ name: 'profile_url', maxCount: 1}]), function (req, res, next) {
                  var file_name = upload(req, res)
                  console.log('file_name result  ' + file_name)
                  controller.uploadProfileImageofUser(req, file_name, res)
            })
      }
}