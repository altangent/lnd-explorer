const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const lnd = require('./lnd');
const app = express();

lnd.connect();

app.use(compression());
app.use('/public/app', serveStatic(path.join(__dirname, '../../dist/app')));
app.use('/public/css', serveStatic(path.join(__dirname, '../../dist/css')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./api/api-home'));
app.use(require('./api/api-transactions'));
app.use(require('./api/api-peers'));
app.use(require('./api/api-channels'));
app.use(require('./api/api-invoices'));
app.use(require('./api/api-payments'));
app.use(require('./api/api-network'));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

app.listen(8000, () => console.log('connected to localhost:8000'));
