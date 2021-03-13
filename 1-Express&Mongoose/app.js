const createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  flash = require('express-flash-messages'),
  session = require('express-session')

// adding controllers
const indexRouter = require('./controllers/index'),
  companyRouter = require('./controllers/company'),
  employeeRouter = require('./controllers/employee')

const app = express()

// database connection
mongoose.connect("mongodb://localhost:27017/hw17", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash())
app.use(session({
  cookie: {
    maxAge: 60000
  },
  secret: 'woot',
  resave: false,
  saveUninitialized: false
}));

// using controllers
app.use('/', [indexRouter, companyRouter, employeeRouter])


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.locals.page = ""
  res.render('404')
})

module.exports = app