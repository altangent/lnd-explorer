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
    console.log('conncted to lnd');
  } catch (ex) {
    console.error(ex);
    process.exit(1);
  }
}
