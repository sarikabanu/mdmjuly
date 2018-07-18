class User
{

    userRegistration(data)
    {
        this.userInstance = {
            Id:uuid(),
            Name:data.name,
            PhoneNumber:data.phoneNumber,
            DeviceId:data.device_id,
            ProfileUrl:data.profileUrl,
            FcmToken:data.fcm_token,
            CreatedDate: new Date(),
            ModifiedDate: new Date(),
            CreatedBy:uuid(),
            ModifiedBy:uuid(),
            Status:1,
        };
        return this.userInstance;
    }
userResponse(result) {
        this.userInstance = {
            Id: result[0].Id,
            Name: result[0].Name,
            PhoneNumber: result[0].PhoneNumber,
            DeviceId:result[0].DeviceId,
            ProfileUrl: result[0].ProfileUrl,
            FcmToken: result[0].FcmToken
           };
        console.log('FcmToken'+this.userInstance.FcmToken)
        return this.userInstance;
    }
getUserInfoByUserId(result) {
        this.userInstance = {
            Id: result[0].Id,
            Name: result[0].Name,
            PhoneNumber: result[0].PhoneNumber,
            DeviceId:result[0].DeviceId,
            ProfileUrl: result[0].ProfileUrl,
            FcmToken: result[0].FcmToken,
            Status:result[0].Status
          };
        return this.userInstance;
    }

// userTokenUpdate() {
//         this.userInstance = {
//              ModifiedDate: new Date()
//            };
//         return this.userInstance;
//     }

updateUserReg(request,result) {
    let response={},name,device_id,fcm_token
  
       if(request.name!=null||request.name!=""||request.name!=undefined)
          {
              name=request.name;
          }
          else{
              name=result[0].Name;
          }
       if(request.device_id!=null||request.device_id!=""||request.device_id!=undefined)
          {
              device_id=request.device_id;
          }
          else{
              device_id=result[0].DeviceId;
          }
      if(request.fcm_token!=null||request.fcm_token!=""||request.fcm_token!=undefined)
          {
              fcm_token=request.fcm_token;
          }
          else{
              fcm_token=result[0].FcmToken;
          }
          return response = {
              name,
              device_id,
              fcm_token,
              ModifiedDate: new Date(),
          }
     }
  
updateUser(request,result) {
  let response={},name,phoneNumber,device_id,profile_url,fcm_token

     if(request.name!=null||request.name!=""||request.name!=undefined)
        {
            name=request.name;
        }
        else{
            name=result[0].Name;
        }
     if(request.phoneNumber!=null||request.phoneNumber!=""||request.phoneNumber!=undefined)
        {
          phoneNumber=request.phoneNumber;
        }
        else{
         phoneNumber=result[0].PhoneNumber;
        }
     if(request.device_id!=null||request.device_id!=""||request.device_id!=undefined)
        {
            device_id=request.device_id;
        }
        else{
            device_id=result[0].DeviceId;
        }
    if(request.profile_url!=null||request.profile_url!=""||request.profile_url!=undefined)
        {
            profile_url=request.profile_url;
        }
        else{
            profile_url=result[0].ProfileUrl;
        }
    if(request.fcm_token!=null||request.fcm_token!=""||request.fcm_token!=undefined)
        {
            fcm_token=request.fcm_token;
        }
        else{
            fcm_token=result[0].FcmToken;
        }
        return response = {
            name,
            phoneNumber,
            device_id,
            profile_url,
            fcm_token,
            ModifiedDate: new Date(),
        }
   }
}
exports.User = User;