const User = require('../models/userModel').User;
var logging  = require('../commons/logging');
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('188626Aw8rSuizqoMT5a379676');

function loginDataAccess() {

  this.userRegistration = function(request, callback) {
    const userModel = new User();
  db.getConnection(function (err, con) {
            if (err) {
               logging.LoggingFunction('userRegistration',err);
               callback(new Error("in connecting to database"));
            }
             else {
                  let userInstance = userModel.userRegistration(request);
                    con.query('insert into user set ?', userInstance, function (err, result) {
                            if (err) {
                            logging.LoggingFunction('userRegistration',err);
                            callback(new Error("while inserting"));
                            }
                            else {
                                con.query('select * from user where PhoneNumber = ? ', [request.phoneNumber], function (err, result) {
                                if (err) {
                                    console.log('err'+err)
                                    logging.LoggingFunction('userRegistration',err);
                                    callback(new Error("in retrieving details after insertion"));
                                }
                                else {
                                    var response = userModel.userResponse(result);
                                    callback(null, response);
                                }
                            });
                        }
                    });
                }
            //  db.end(function(err){       
            //   if(!err)connection=null;       
            //   else console.log(err)         
            //  });
         });
   },

 this.loginUser = function(phoneNumber, callback) {
  db.getConnection(function (err, con) {
            if (err) {
               logging.LoggingFunction('loginUser',err);
               callback(new Error("in connecting to database"));
            }
            else {
                con.query('Select * from user where PhoneNumber = ?', phoneNumber, function (err, userResult) {
                 if (err) {
                    logging.LoggingFunction('loginUser',err);
                    callback(new Error("could not get details of current user"));
                    }
                    else if(userResult.length > 0) {
                        //      console.log('phoneNumber1  '+phoneNumber);
                        //    sendOtp.send(phoneNumber, "mdmotp", function (error, data, response) {
                        //     console.log(data);
                        //      console.log('phoneNumber  '+phoneNumber);
                        //     });
                        //       console.log('otp'+otp);
                        //     sendOtp.verify(phoneNumber, otp, function (error, data1, response) {
                        //      console.log(data1);
                        //      if(data1.type =='success')
                              callback(null, true);
                        
                            //   callback(null, true);
                            //  });
                            
                         
                        }
                    else{
                         logging.LoggingFunction('loginUser','no rows in database');
                        callback(new Error("no rows in database"));
                     }
                });
            }
        //   db.end(function(err){
        //      if(!err)connection=null;     
        //     else console.log(err)         
        //     });
        });

    }
}

module.exports = new loginDataAccess();
