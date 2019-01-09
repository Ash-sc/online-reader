#!/usr/bin/env node

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const path = require('path');
const compression = require('compression');

// routers
const articleRouter = require('./server/article/article');

//
app.use(compression());

// server static files
app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());

// set json header
app.use((req, res, next) => {
  res.contentType('application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// web router config
app.use('/api/article', articleRouter);
app.use('/article', articleRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log(JSON.stringify(req.cookies));
  const err = new Error('Not Found');
  err.status = 404;
  res.status(404);
  next(err);
});

process.on('uncaughtException', (e) => {
  console.error('node server uncaughtException:', e);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    console.error(`uncatch error:${err}`);
    res.status(err.status || 500).send({
      errorInfo: err.message,
      result: 1,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  console.error(`uncatch error:${err}`);
  res.status(err.status || 500);
  res.send({
    errorInfo: err.message,
    result: 1,
  });
});

const port = 4396;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
