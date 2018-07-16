var express = require('express');
var bodyparser = require('body-parser');
require('./commons/routeInit');

var app = express();
app.use(bodyparser.urlencoded({limit: '50mb',extended: true}));
app.use(bodyparser.json({ limit: '50mb' }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'access-control-allow-methods,access-control-allow-origin,x-access-token,content-type,Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

_Routes.login.configure(app);
_Routes.user.configure(app);
_Routes.app.configure(app);
_Routes.device.configure(app);


var server = app.listen(process.env.PORT || 60, function() {
    console.log('Server listening on port ' + server.address().port);
});
