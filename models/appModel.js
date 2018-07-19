

class App {

    appmod(data) {

        console.log('appid in model' + data.device_id)
        this.appInstance = {
            AppId: data.app_id,
            Name: data.name,
            Version: data.version,
            Icon: data.icon,
            DeviceId: data.device_id,
            ModifiedDate: new Date(),
        };
        return this.appInstance;
    }

    appInsert(data) {

        console.log('appid in model 2' + data.AppId)
        this.appInstance = {
            Id: uuid(),
            AppId: data.AppId,
            Name: data.Name,
            Version: data.Version,
            Icon: data.Icon,
            DeviceId: data.DeviceId,
            CreatedDate: new Date(),
            Status: 1,
        };
        return this.appInstance;
    }

    getAppInfoByDeviceId(result) {
        this.appInfoInstance = {
            Id: result[0].Id,
            AppId: result[0].AppId,
            Name: result[0].Name,
            Version: result[0].Version,
            Icon: result[0].Icon,
            DeviceId: result[0].DeviceId,
            CreatedDate: result[0].CreatedDate,
            ModifiedDate: result[0].ModifiedDate,
            CreatedBy: result[0].CreatedBy,
            ModifiedBy: result[0].ModifiedBy,
            Status: result[0].Status
        };
        return this.appInfoInstance;
    }

    appUpdate(request, result) {
        let response = {}, app_id, name, version, icon, device_id

        if (request.app_id != null || request.app_id != "" || request.app_id != undefined) {
            app_id = request.app_id;
        }
        else {
            app_id = result[0].AppId;
        }
        if (request.name != null || request.name != "" || request.name != undefined) {
            name = request.name;
        }
        else {
            name = result[0].Name;
        }
        if (request.version != null || request.version != "" || request.version != undefined) {
            version = request.version;
        }
        else {
            version = result[0].Version;
        }
        if (request.icon != null || request.icon != "" || request.icon != undefined) {
            icon = request.icon;
        }
        else {
            icon = result[0].Icon;
        }
        if (request.device_id != null || request.device_id != "" || request.device_id != undefined) {
            device_id = request.device_id;
        }
        else {
            device_id = result[0].DeviceId;
        }
        return response = {
            app_id,
            name,
            version,
            icon,
            device_id,
            ModifiedDate: new Date(),
        }
    }

}
exports.App = App;