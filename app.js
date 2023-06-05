require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const port = 5000 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static folder
app.use(express.static('public'));

//Templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Home
app.get('/', (req, res) => {
  const locals = {
    title: 'NodeJs',
    description: 'NodeJs User Management System by harsh',
  };

  res.render('index', locals);
});

app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
});
