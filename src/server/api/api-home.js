const express = require('express');
const lnd = require('../lnd');
const app = express();

app.get('/api/home', (req, res, next) => getHomeInfo(req, res).catch(next));

module.exports = app;

async function getHomeInfo(req, res) {
  let [info, walletBalance, channelBalance] = await Promise.all([
    lnd.client.getInfo({}),
    lnd.client.walletBalance({}),
    lnd.client.channelBalance({}),
  ]);
  res.send({ info, walletBalance, channelBalance });
}
