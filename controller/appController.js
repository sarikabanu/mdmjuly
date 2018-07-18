var appcontroller = require('../dataAccess/appData'); 
var logging  = require('../commons/logging');


function appController() {

 this.insert = function (req, res) {
     console.log('req appid  ' + req.body[0].app_id) 
    if (!req.body) {
        res.status(400).send({ error:'fields are required' })
    }else {
        appcontroller.appInsert(req.body,function(error,response) {
         if (error) {
                   error = error.toString()
                   res.status(500).send({error})
            }else {
                 res.status(200).send({ message:'Successfull' })
                 }
            });
        }
    },
 
// status = 0 :appuninstalled,
// status = 1 :appinstalled//appunlock
// status = -1 :applocked depend on duration
 this.appAction = function (req, res) {
    if (!req.body) {
       res.status(400).send({ error:'fields are required' })
    }else {
        appcontroller.appAction(req.body,function(error,response) {
            if (error) {
                console.log('error'+error)
                error = error.toString()
                res.status(500).send({error})
            }
             else if(req.body.status == 0){
                  res.status(200).send({ message:'app is uninstalled' })
             }
             else if(req.body.status == 1){
                  res.status(200).send({ message:'app is installed' })
             }
             else {
                  res.status(200).send({ message:'app is locked' })
              }
            });
        }
    },

 this.getAppInfoByDeviceId = function (req, res) {
     let DeviceId = req.headers['device_id'];
    if (!DeviceId) {
         res.status(400).send({ error:'DeviceId is required' })
      }else {
        appcontroller.getAppInfoByDeviceId(DeviceId,function(error,response) {
            if (error) {
                error = error.toString()
                res.status(500).send({error})
              }else {
                  res.json(response)
                }
            });
        }
    }

 this.getAppInfoByAppId = function (req, res) {
    let AppId = req.headers['app_id']
     if (!AppId) {
         res.status(400).send({ error:'AppId is required' })
      }else {
        appcontroller.getAppInfoByAppId(AppId,function(error,response) {
            if (error) {
                error = error.toString()
                res.status(500).send({error})
              }else {
                  res.json(response)
                }
            });
        }
    }

  this.getAppInfo = function (req, res) {
        appcontroller.getAppInfo(function(error,response) {
            if (error) {
                error = error.toString()
                res.status(500).send({error})
              }else {
                  res.json(response)
                }
            });
        }
    

}

module.exports = new appController();
