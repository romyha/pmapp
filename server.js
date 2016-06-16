var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');
var path = require('path');

//require('../app_api/models/db');
//require('../app_api/config/passport');
//var passport = require('passport');
//var routesApi = require('../app_api/routes/index')

var app = express();



var corsOptions = {
    origin: "*"
}
app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static('www'));


//app.use(passport.initialize());
//app.use('/api', routesApi);

/*app.use(function (req, res) {
    res.sendFile(path.join(__dirname, 'www', 'index.html'));
});*/

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
/*app.all('*', function (req, res, next) {
        console.log("header setup");

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});*/

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
