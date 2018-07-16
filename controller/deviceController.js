var devicecontroller = require('../dataAccess/deviceData'); 
var logging  = require('../commons/logging');


function deviceController() {

 this.insert = function (req, res) {
    console.log('req  ' + req.body.DeviceId)
    if (!req.body) {
        res.status(400).send({ error:'fields are required' })
    }else {
        devicecontroller.deviceInsert(req.body,function(error,response) {
            if (error) {
                   error = error.toString()
                   res.status(500).send({error})
             }else {
                 res.status(200).send({ message:'insertion Successfull' })
               }
            });
        }
    },

 this.update = function (req, res) {
    console.log('req  ' + req.body.DeviceId)
    if (!req.body) {
        res.status(400).send({ error:'fields are required' })
    }else {
        devicecontroller.deviceUpdate(req.body,function(error,response) {
            if (error) {
                   error = error.toString()
                   res.status(500).send({error})
             }else {
                 res.status(200).send({ message:'updation Successfull' })
               }
            });
        }
    },

 this.getDeviceInfoByUserId = function (req, res) {
    let UserId = req.headers['user_id'];
 if (!UserId) {
         res.status(400).send({ error:'UserId is required' })
    }else {
        devicecontroller.getDeviceInfoByUserId(UserId,function(error,response) {
            if (error) {
                   error = error.toString()
                   res.status(500).send({error})
            }else {
                 res.json(response)
                 }
            });
        }
    }

 this.getDeviceInfo = function (req, res) {
        devicecontroller.getDeviceInfo(function(error,response) {
            if (error) {
                   error = error.toString()
                   res.status(500).send({error})
            }else {
                 res.json(response)
                 }
            });
        }
 

}

module.exports = new deviceController();
