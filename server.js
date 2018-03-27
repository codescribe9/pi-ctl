var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var exphbs = require('express-handlebars');

// Load environment variables from .env file
dotenv.load();

// Controllers
var HomeController = require('./controllers/home');
var PiesController = require('./controllers/pies');

var app = express();


var hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifeq: function(a, b, options) {
      if (a === b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    toJSON : function(object) {
      return JSON.stringify(object);
    }
  },
  extname:'.hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(flash())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', HomeController.index)
app.get('/pies', PiesController.loadPiesInfo)
app.get('/pi/audio/:vol', PiesController.adjustVolume)
app.get('/pi/video/:vid', PiesController.playVideo)
app.get('/pi/restartTiles/:num', PiesController.restartTiles)
app.get('/pi/shutdownSlaves', PiesController.shutdownSlaves)
app.get('/pi/rebootSlaves', PiesController.rebootSlaves)
app.get('/pi/getPowerState', PiesController.getPowerState)
app.get('/pi/togglePower', PiesController.togglePower)
app.get('/pi/screens/:num', PiesController.toggleScreens)



app.get('/admin', (req, res) => {
  res.render('admin', {})
});


// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;