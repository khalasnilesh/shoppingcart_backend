const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config');
const app = express();
const userRoutes = require('./routes/users');
const countryRoutes = require('./routes/country');
const roleRoutes = require('./routes/roles');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const session = require('express-session');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/uploads',express.json());
app.use(cors());
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    name : 'codeil',
    secret : 'something',
    resave :false,
    saveUninitialized: true,
    cookie : {
            maxAge:(1000 * 60 * 100)
    }      
  }));
app.use('/users' , userRoutes);
app.use('/api', countryRoutes);
app.use('/role' , roleRoutes);
app.use('/category',categoryRoutes);
app.use('/product', productRoutes);

app.get('/', function(req, res) {
  res.render('../views/home');
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(config.port, () => console.log("App is listening on ",+ config.port));

module.exports = app;