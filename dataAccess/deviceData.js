const Device = require('../models/deviceModel').Device;
var logging  = require('../commons/logging');


function deviceDataAccess() {

  this.deviceInsert = function(request, callback) {
    const deviceModel = new Device();
  db.getConnection(function (err, con) {
            if (err) {
               logging.LoggingFunction('deviceInsert',err);
               callback(new Error("in connecting to database"));
            }
             else {
                let deviceInstance = deviceModel.insertDevice(request);
                con.query('insert into device set ?', deviceInstance, function (err, result) {
                     if (err) {
                        logging.LoggingFunction('deviceInsert',err);
                        callback(new Error("while inserting"));
                     } else {
                         callback(null, true);
                     }
                 });
             }
            //  db.end(function(err){
            // if(!err)connection=null;
            // else console.log(err)
            // });
        });
    },

this.deviceUpdate = function(request, callback) {
    const deviceModel = new Device();
  db.getConnection(function (err, con) {
        if (err) {
            logging.LoggingFunction('deviceUpdate',err);
            callback(new Error("in connecting to database"));
        }
         else { 
           con.query('Select * from device where DeviceID = ?', [request.device_id], function (err, result) {
            if (err) {
                logging.LoggingFunction('deviceUpdate',err);
                callback(new Error("could not get details"));
            }else
                if(result.length>0){
                  let deviceInstance = deviceModel.updateDevice(request,result);
                    con.query('update device set Name = ?,UserId = ?,DeviceID = ?,ModifiedDate = ? where Id = ?',[deviceInstance.name,deviceInstance.user_id,deviceInstance.device_id,deviceInstance.ModifiedDate,request.id] , function (err, result) {
                            if (err) {
                                logging.LoggingFunction('deviceUpdate',err);
                                callback(new Error("while inserting"));
                                }
                            else {
                                 callback(null, true);
                            }
                      });
                   }
                   else{
                    logging.LoggingFunction('deviceUpdate','no rows in database');
                    callback(new Error("no rows in database"));
                   }
              });
           }
        //  db.end(function(err){    
        //  if(!err)connection=null;     
        //  else console.log(err)         
        // });
      });
  },

 this.getDeviceInfoByUserId = function(UserId, callback) {
    const deviceModel = new Device();
 db.getConnection(function (err, con) {
        if (err) {
            logging.LoggingFunction('getDeviceInfoByUserId',err);
            callback(new Error("in connecting to database"));
        }
        else {
            con.query('Select * from device where UserId = ?', UserId, function (err, userResult) {
                if (err) {
                logging.LoggingFunction('getDeviceInfoByUserId',err);
                callback(new Error("could not get details of current app"));
                }
                else if(userResult.length > 0) {
                        console.log('data is present')
                        // let result = deviceModel.getDeviceInfoByUserId(userResult);
                        callback(null, userResult);
                        }
                else{
                    logging.LoggingFunction('getDeviceInfoByUserId','no rows in database');
                    callback(new Error("no rows in database"));
                     }
                });
            }
        //   db.end(function(err){ 
        //     if(!err)connection=null;       
        //     else console.log(err)          
        //    });
        });
    },
    
this.getDeviceInfo = function(callback) {
 db.getConnection(function (err, con) {
        if (err) {
            logging.LoggingFunction('getDeviceInfo',err);
            callback(new Error("in connecting to database"));
        }
        else {
            con.query('Select * from device', function (err, userResult) {
                if (err) {
                logging.LoggingFunction('getDeviceInfo',err);
                callback(new Error("could not get details of device"));
                }
                else if(userResult.length > 0) {
                        console.log('data is present')
                        callback(null, userResult);
                        }
                else{
                    logging.LoggingFunction('getDeviceInfo','no rows in database');
                    callback(new Error("no rows in database"));
                     }
                });
            }
        //   db.end(function(err){          
        //    if(!err)connection=null;       
        //   else console.log(err)          
        //    });
        });
    }
}

module.exports = new deviceDataAccess();
