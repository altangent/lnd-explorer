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
    let lndHost = process.env.LND_HOST;
    let lndPort = process.env.LND_PORT;
    let certPath = process.env.LND_CERT_PATH;
    let macaroonPath = process.env.LND_MACAROON_PATH;
    let noMacaroons = process.env.LND_NO_MACAROONS;

    lndPort = parseInt(lndPort) || undefined; // integer or undefined
    noMacaroons = noMacaroons === 'true' || undefined; // true or undefined

    // connect with supplied options or let connection
    // defaults take precedence by passing undefined
    _instance = await lndAsync.connect({
      lndHost,
      lndPort,
      certPath,
      macaroonPath,
      noMacaroons,
    });

    winston.info('connected to lnd');
  } catch (ex) {
    winston.error(ex);
    process.exit(1);
  }
}
