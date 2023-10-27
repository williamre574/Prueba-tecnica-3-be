const createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const homeRoutes = require('./routes/index');


const obesidadesRoutes = require('./routes/obecidad');
const ObesidadesService= require('./services/obecidad-service');
const app = express();
//app.set("port",3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(cors());
app.use(morgan('dev'));
///app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', homeRoutes);

app.use('/obesidad',obesidadesRoutes)
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});




// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
ObesidadesService.init().then((obecidadsService)=>{
  app.set('obecidadsService',obecidadsService);
});
process.on('exit', () => {
  app.get('obecidadsService').closePool();
});

module.exports = app;
