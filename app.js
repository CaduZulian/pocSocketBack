const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'success'
  })
})

app.use((req, res, next) => {
  const err = new Error('Rota não encontrada')
  err.status = 404
  next(err)
})

app.use((err, req, res) => {
  res.status(err.status || 500)
  return res.send({
    error: {
      message: err.message
    }
  })
})

module.exports = app;
