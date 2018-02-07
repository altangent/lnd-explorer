const winston = require('winston');
const lndAsync = require('lnd-async');
let _instance;

module.exports = {
  connect,
  get client() {
    return _instance;
  },
};

async function connect() {
  try {
    _instance = await lndAsync.connect();
    winston.info('conncted to lnd');
  } catch (ex) {
    winston.error(ex);
    process.exit(1);
  }
}
