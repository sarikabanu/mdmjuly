var usercontroller = require('../dataAccess/userData'); 
var logging  = require('../commons/logging');


function userController() {

this.userUpdate = function (req, res) {
    console.log('req  ' + req.body.Id)
    if (!req.body) {
        res.status(400).send({ error:'Id is required' })
    }else {
        usercontroller.userUpdate(req.body,function(error,response) {
          if (error) {
                error = error.toString()
                res.status(500).send({error})
            }else {
                 res.status(200).send({ message:'updated Successfully' })
                 }
            });
        }
    },

this.userTokenUpdate = function (req, res) {
    console.log('req  ' + req.body.phoneNumber)
    if (!req.body) {
        res.status(400).send({ error:'fields are required' })
    }else {
        usercontroller.userTokenUpdate(req.body,function(error,response) {
          if (error) {
                error = error.toString()
                res.status(500).send({error})
            }else {
                 res.status(200).send({ message:'updated Successfully' })
                 }
            });
        }
    },

 this.getUserInfo = function (req, res) {
        usercontroller.getUserInfo(function(error,response) {
           if (error) {
                   error = error.toString()
                   res.status(500).send({error})
            }else {
                 res.json(response)
                 }
            });
    },

 this.getUserInfoByUserId = function (req, res) {
  let Id = req.headers['user_id'];
  if (!Id) {
         res.status(400).send({ error:'UserId is required' })
    }else {
        usercontroller.getUserInfoByUserId(Id,function(error,response) {
            if (error) {
                   error = error.toString()
                   res.status(500).send({error})
            }else {
                res.json(response)
                 }
            });
        }
    }

 this.uploadProfileImageofUser = function (req,file_name, res) {
     console.log("file_name "+file_name)
     let Id = req.body.id
     if(!Id){
     res.status(400).send({ error:'UserId is required' })
     } else{
      usercontroller.uploadProfileImageofUser(Id,file_name,function(error,response) {
            if (error) {
                   error = error.toString()
                   res.status(500).send({error})
            }else {
                 res.status(200).send({ message:'uploaded' })
             }
         });
     }
  }

}

module.exports = new userController();
