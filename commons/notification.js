var FCM = require('fcm-node');

setconfig = require('../config/setconfig');
setconfig.setConf(false);

var serverKey = setconfig.properties.fcmNotification.serverKey

var fcm = new FCM(serverKey);

 exports.sendNotification = function (fcm_token,status,app_id,app,req, res) {
     console.log('status in notification1 '+status)
    console.log('appid in notification1 '+app_id)
    console.log('appname in notification1 '+app)
  if(status==-1){
      console.log('status in notification11   '+status)
      var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera) 
       to: fcm_token,
       data: {
            title: 'App notification', 
            // body: {
                status:'your app is locked' ,
                app_id: app_id,
                app_name: app
            // }
        }
     };   
    }
    else if(status==0){
         var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera) 
       to: fcm_token,
       data: {
            title: 'App notification', 
            // body: {
                status:'your app is uninstalled' ,
                app_id: app_id,
                app_name: app
            // }
        }
     };   
    }
    else{ 
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera) 
       to: fcm_token,
       data: {
            title: 'App notification', 
           body: 'please give proper input'
        }
     };   
    }
    
    fcm.send(message, function(err, response){
         console.log("#############!  "+message.data.app_id);
        if (err) {
            console.log("Something has gone wrong!  "+err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
}
