const User = require('../models/userModel').User;
var logging  = require('../commons/logging');

function userDataAccess() {
 
 this.userUpdate = function(request, callback) {
     const userModel = new User();
  db.getConnection(function (err, con) {
        if (err) {
            logging.LoggingFunction('userUpdate',err);
            callback(new Error("in connecting to database"));
        }
         else {
             con.query('Select * from user where Id = ?', [request.id], function (err, result) {
             if (err) {
                logging.LoggingFunction('userUpdate',err);
                callback(new Error("could not get details "));
             }else
                if(result.length>0){
                  let userInstance = userModel.updateUser(request,result);
              con.query('update user set Name =  ?,PhoneNumber = ?,DeviceId = ?,ProfileUrl = ?,FcmToken = ?,ModifiedDate = ? where Id = ?', [userInstance.name,userInstance.phoneNumber,userInstance.device_id,userInstance.profile_url,userInstance.fcm_token,userInstance.ModifiedDate,request.id], function (err, result) {
                    if (err) {
                        logging.LoggingFunction('userUpdate',err);
                        callback(new Error("while inserting"));
                        }
                        else {
                            console.log('data updation successfull')
                            callback(null, true);
                        }
                   });
                 }
                else{
                    logging.LoggingFunction('userUpdate','no rows in database');
                    callback(new Error("no rows in database"));
                }
           });
        }
    //    db.end(function(err){ 
    //     if(!err)connection=null;    
    //         else console.log(err)
    //     });
   });
},
 
 this.userTokenUpdate = function(request, callback) {
     const userModel = new User();
  db.getConnection(function (err, con) {
        if (err) {
            logging.LoggingFunction('userTokenUpdate',err);
            callback(new Error("in connecting to database"));
        }
         else {
             con.query('Select * from user where DeviceId = ? and PhoneNumber = ? ', [request.device_id,request.phoneNumber], function (err, result) {
             if (err) {
                logging.LoggingFunction('userTokenUpdate',err);
                callback(new Error("could not get details "));
             }else
                if(result.length>0){
                //    let userData = userModel.userTokenUpdate();
              con.query('update user set FcmToken = ?,ModifiedDate = ? where DeviceId = ? and PhoneNumber = ?', [request.fcm_token,new Date(),request.device_id,request.phoneNumber], function (err, result) {
                    if (err) {
                        logging.LoggingFunction('userTokenUpdate',err);
                        callback(new Error("while inserting"));
                        }
                        else {
                            console.log('data updation successfull')
                            callback(null, true);
                        }
                   });
                 }
                else{
                    logging.LoggingFunction('userTokenUpdate','no rows in database');
                    callback(new Error("no rows in database"));
                }
           });
        }
    //   db.end(function(err){
    //     if(!err)connection=null;            
    //      else console.log(err)            
    //      });
   });
}, 
  this.getUserInfo = function(callback) {
  db.getConnection(function (err, con) {
        if (err) {
            logging.LoggingFunction('getUserInfo',err);
            callback(new Error("in connecting to database"));
        }
         else {
                con.query('select * from user',  function (err, result) {
                    if (err) {
                        logging.LoggingFunction('getUserInfo',err);
                        callback(new Error("err"));
                        }
                        else  if(result.length>0){
                            callback(null, result);
                     } else{
                         logging.LoggingFunction('getUserInfo','no rows in database');
                        callback(new Error("no rows in database"));
                    } 
                 });
              }
            // db.end(function(err){             
            //  if(!err)connection=null;            
            //   else console.log(err)           
            //   });
         });
   },

 this.getUserInfoByUserId = function(Id, callback) {
    const userModel = new User();
 db.getConnection(function (err, con) {
        if (err) {
            logging.LoggingFunction('getUserInfoByUserId',err);
            callback(new Error("in connecting to database"));
        }
        else {
            con.query('Select * from user where Id = ?', Id, function (err, userResult) {
                if (err) {
                logging.LoggingFunction('getUserInfoByUserId',err);
                callback(new Error("could not get details "));
                }
                else if(userResult.length > 0) {
                        console.log('data is present')
                        let result = userModel.getUserInfoByUserId(userResult);
                        callback(null, result);
                        }
                  else{
                    logging.LoggingFunction('getUserInfoByUserId','no rows in database');
                    callback(new Error("no rows in database"));
                     }
                });
            }
        //   db.end(function(err){             
        //     if(!err)connection=null;             
        //     else console.log(err)             
        //   });
        });
    }
    
this.uploadProfileImageofUser = function(Id,file_name, callback) {
  db.getConnection(function (err, con) {
     if (err) {
            logging.LoggingFunction('uploadProfileImageofUser',err);
            callback(new Error("in connecting to database"));
            }
         else {
            con.query('update user set ProfileUrl = ? where Id = ?', [file_name, Id], function (err, result) {
            if (err) {
                 console.log('result 0 '+err)
                    logging.LoggingFunction('uploadProfileImageofUser',err);
                    callback(new Error("while uploading"));
                }
             else {
                console.log('result 1 '+result.length)
                logging.LoggingFunction('uploadProfileImageofUser',result);
                callback(null, true);
             }
            });
         }
    //    db.end(function(err){            
    //      if(!err)connection=null;            
    //       else console.log(err)           
    //       });
     });
  }
}

module.exports = new userDataAccess();
