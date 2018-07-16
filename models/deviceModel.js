class Device
{

   insertDevice(data)
    {
        console.log('device'+data.device_id)
        this.deviceInstance = {
            Id:uuid(),
            Name:data.name,
            UserId:data.user_id,
            DeviceId:data.device_id,
            CreatedDate: new Date(),
            ModifiedDate: new Date(),
            CreatedBy:uuid(),
            ModifiedBy:uuid(),
            Status:1
        };
        return this.deviceInstance;
    }
 
 getDeviceInfoByUserId(result)
    {
        this.deviceInstance = {
            Id:result[0].Id,
            Name:result[0].Name,
            UserId:result[0].UserId,
            DeviceId:result[0].DeviceId,
            CreatedDate: result[0].CretedDate,
            ModifiedDate:result[0].ModifiedDate,
            CreatedBy:result[0].CreatedBy,
            ModifiedBy:result[0].ModifiedBy,
            Status:result[0].Status
        };
        return this.deviceInstance;
    }

 updateDevice(request,result) {
  let response={},name,user_id,device_id

     if(request.name!=null||request.name!=""||request.name!=undefined)
        {
            name=request.name;
        }
        else{
            name=result[0].Name;
        }
     if(request.user_id!=null||request.user_id!=""||request.user_id!=undefined)
        {
          user_id=request.user_id;
        }
        else{
         user_id=result[0].user_id;
        }
     if(request.device_id!=null||request.device_id!=""||request.device_id!=undefined)
        {
            device_id=request.device_id;
        }
        else{
            device_id=result[0].DeviceId;
        }
        return response = {
            name,
            user_id,
            device_id,
            ModifiedDate: new Date(),
        }
   }
}

exports.Device = Device;