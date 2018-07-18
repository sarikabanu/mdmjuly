const App = require('../models/appModel').App;
var logging = require('../commons/logging');
var notify = require('../commons/notification');


function appDataAccess() {

    this.appInsert = function (request, callback) {
        const appModel = new App();
        db.getConnection(function (err, con) {
            if (err) {
                logging.LoggingFunction('appInsert', err);
                callback(new Error("connecting to database"));
            }
            else {
                let i = 0;
                for (i; i < request.length; i++) {

                    let appuse = appModel.appmod(request[i]);
                    con.query('Select * from app where AppId = ? and DeviceId = ?', [appuse.AppId,appuse.DeviceId], function (err, userResult) {
                        if (err) {
                            logging.LoggingFunction('appInsert', err);
                            callback(new Error("while fetching data of curent app"));
                        }
                        else if (userResult.length > 0) {
                            console.log('updating')
                            //    let appup = appModel.appUpdate(appuse,userResult);
                            con.query('update app set Version = ?,Icon = ?,ModifiedDate = ? where AppId = ? and DeviceId = ?', [appuse.Version, appuse.Icon, appuse.ModifiedDate, appuse.AppId, appuse.DeviceId], function (err, result) {
                                if (err) {
                                    logging.LoggingFunction('appupdate', err);
                                    callback(new Error("while updating"));
                                }
                                else {
                                    console.log('successfully updated')
                                    callback(null, true);
                                }
                            });
                        } else {
                            let appInstance = appModel.appInsert(appuse);
                            con.query('insert into app set ?', appInstance, function (err, result) {
                                if (err) {
                                    logging.LoggingFunction('appInsert', err);
                                    callback(new Error("while inserting"));
                                }
                                else {
                                    console.log('successful insertion')
                                    callback(null, true);
                                }
                            });
                        }
                    });
                }
            }
        });
    },


        this.appAction = function (request, callback) {
            const appModel = new App();
            db.getConnection(function (err, con) {
                if (err) {
                    logging.LoggingFunction('appAction', err);
                    callback(new Error(" in connecting to database"));
                }
                else {
                    con.query('Select * from app where AppId = ?', request.app_id, function (err, userResult) {
                        if (err) {
                            logging.LoggingFunction('appAction', err);
                            callback(new Error("could not get details of current app"));
                        }
                        else
                            if (userResult.length > 0) {
                                app = userResult[0].Name
                                console.log('appname 1 in appdata ' + app)
                                con.query('update app set Status = ? where AppId = ? and DeviceId = ?', [request.status, request.app_id, request.device_id], function (err, result) {
                                    if (err) {
                                        logging.LoggingFunction('appAction', err);
                                        callback(new Error("while inserting"));
                                    } else {
                                        con.query('select FcmToken from user where DeviceId = ? and PhoneNumber = ?', [request.device_id, request.phoneNumber], function (err, result) {
                                            if (err) {
                                                logging.LoggingFunction('appAction', err);
                                                callback(new Error("could not found user"));
                                            }
                                            else
                                                if (result.length > 0) {
                                                    const fcm_token = result.length
                                                    for (i = 0; i < fcm_token; i++) {
                                                        let fcmtoken = result[i].FcmToken
                                                        console.log('fcm    ' + fcmtoken)
                                                        if (fcmtoken != null) {
                                                            status = request.status
                                                            app_id = request.app_id
                                                            console.log('appname2 in appdata ' + app)
                                                            console.log('status in appdata' + status)
                                                            notify.sendNotification(fcmtoken, status, app_id, app);
                                                            console.log('successfuly sent notification')
                                                        }
                                                    }
                                                    callback(null, true);
                                                }
                                                else {
                                                    logging.LoggingFunction('appAction', err);
                                                    callback(new Error("could not get fcm token of user"));
                                                }
                                        });
                                    }
                                });
                            }
                            else {
                                logging.LoggingFunction('appAction', 'no rows in database');
                                callback(new Error("no rows in database"));
                            }

                    });
                }
                //  db.end(function(err){
                // if(!err)connection=null;
                // else console.log(err)
                // });
            });
        },

        //u ll get app wic is added on curent date
        this.getAppInfoByDeviceId = function (DeviceId, callback) {
            const appModel = new App();
            db.getConnection(function (err, con) {
                if (err) {
                    logging.LoggingFunction('getAppInfoByDeviceId', err);
                    callback(new Error("in connecting to database"));
                }
                else {
                    con.query(' Select * from app where date(CreatedDate) = date(CURRENT_DATE()) and DeviceId = ?', DeviceId, function (err, userResult) {
                        if (err) {
                            console.log('data ' + err)
                            logging.LoggingFunction('getAppInfoByDeviceId', err);
                            callback(new Error("could not get details of current app"));
                        }
                        else if (userResult.length > 0) {
                            console.log('data is present')
                            //console.log(userResult)

                            // let result = appModel.getAppInfoByDeviceId(userResult);
                            callback(null, userResult);
                        }
                        else {
                            logging.LoggingFunction('getAppInfoByDeviceId', 'no rows in database');
                            callback(new Error("no rows in database"));
                        }
                    });
                }
                // db.end(function(err){
                // if(!err)connection=null;
                // else console.log(err)
                // });
                // db.end();
            });
        },

        this.getAppInfoByAppId = function (AppId, callback) {
            const appModel = new App();
            db.getConnection(function (err, con) {
                if (err) {
                    logging.LoggingFunction('getAppInfoByAppId', err);
                    callback(new Error("in connecting to database"));
                }
                else {
                    con.query('Select * from app where AppId = ?', AppId, function (err, userResult) {
                        if (err) {
                            logging.LoggingFunction('getAppInfoByAppId', err);
                            callback(new Error("could not get details of current app"));
                        }
                        else if (userResult.length > 0) {
                            console.log('data is present')
                            let result = appModel.getAppInfoByDeviceId(userResult);
                            callback(null, result);
                        }
                        else {
                            logging.LoggingFunction('getAppInfoByAppId', 'no rows in database');
                            callback(new Error("no rows in database"));
                        }
                    });
                }
                //  db.end(function(err){
                // if(!err)connection=null;
                // else console.log(err)
                // });
            });
        }

    this.getAppInfo = function (callback) {
        db.getConnection(function (err, con) {
            if (err) {
                logging.LoggingFunction('getAppInfo', err);
                callback(new Error("in connecting to database"));
            }
            else {
                con.query('Select * from app ', function (err, userResult) {
                    if (err) {
                        logging.LoggingFunction('getAppInfo', err);
                        callback(new Error("could not get details of app"));
                    }
                    else if (userResult.length > 0) {
                        console.log('data is present')
                        callback(null, userResult);
                    }
                    else {
                        logging.LoggingFunction('getAppInfo', 'no rows in database');
                        callback(new Error("no rows in database"));
                    }
                });
            }
            //  db.end(function(err){
            // if(!err)connection=null;
            // else console.log(err)
            // });
        });
    }
}

module.exports = new appDataAccess();
