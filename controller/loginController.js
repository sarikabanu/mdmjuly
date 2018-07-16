var loginController = require('../dataAccess/loginData'); 
var logging  = require('../commons/logging');
var random = require("random-js")(); // uses the nativeMath engine


function userController() {

 this.userRegistration = function (req, res) {
    console.log('req  ' + req.body.phoneNumber)
    if (!req.body) {
        res.status(400).send({ error:'fields are required' })
    }else {
        loginController.userRegistration(req.body,function(error,response) {
           if (error) {
                error = error.toString()
                res.status(500).send({error})
            }else {
                res.json(response)
                }
            });
        }
    },

 this.userLogin = function (req, res) {
    console.log('req  ' + req.body.phoneNumber)
    let phoneNumber = req.body.phoneNumber
    // let otp = req.body.otp
    if (!phoneNumber) {
         res.status(400).send({ error:'phoneNumber is required' })
    }else {
        loginController.loginUser(phoneNumber,function(error,response) {
          if (error) {
                error = error.toString()
                res.status(500).send({error})
            }else {
                 res.status(200).send({message:'login successfull' })
                 }
            });
        }
    }

}

module.exports = new userController();
