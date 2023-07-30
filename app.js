require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const connectDB = require('./server/config/db');

const app = express();
const port = 8888 || process.env.PORT;

//Connect to DB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

//static folder
app.use(express.static('public'));

//Express Session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// Flash Messages
app.use(
  flash({
    sessionKeyName: 'flash',
  })
);

//Templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Router
app.use('/', require('./server/routes/customer'));

//Handle 404

app.get('*', (req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
});
