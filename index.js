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
const session = require('express-session');

app.use(express.json());
app.use(cors());
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

app.get('/', (req,res) => res.send('hello this is node js project'));

app.listen(config.port, () => console.log("App is listening on ",+ config.port));

module.exports = app;