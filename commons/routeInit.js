uuid = require('uuid');
db = require('../commons/mysqlConnection').pool;
setconfig = require('../config/setconfig');
setconfig.setConf(false);
Q = require('q');

console.log('in route init');

_Routes = {
    login: require('../routes/loginRoute'),
    user: require('../routes/userRoute'),
    app:require('../routes/appRoute'),
    device:require('../routes/deviceRoute')
};