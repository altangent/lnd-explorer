# LND Explorer

LND Explorer is a web interface for interacting with the Lightning Network via LND.

## Installation

LND Explorer requires LND 0.4-beta.

Run LND Explorer against a local installation on LND:

```
git clone https://github.com/altangent/lnd-explorer
cd lnd-explorer
npm install && npm run build
npm start
```

## Runtime options

LND Explorer will connect to LND via localhost on the default port. It will use the default OS specific paths for the tls.cert and admin.macaroon. If you have modified the port, file paths, or are not using macaroons, you can use environment variables to drive the connection to LND.

Supported environment variables:

```
SERVER_HOST - the host express will listen on (default: localhost)
SERVER_PORT - the port express will listen on (default: 8000)
LND_HOST - the LND host (default: localhost)
LND_PORT - the LND port (default: 10009)
LND_CERT_PATH - the path to tls.cert (default: OS specific default path for LND)
LND_MACAROON_PATH - the path to the admin.macaroon file (default: OS specific default path for LND)
LND_NO_MACAROONS - set to true to disable macaroons
```

## Run with Docker

Build the Dockerfile:

```
docker build . -t lnd-explorer
```

Run it, using the variables listed above to configure the application.  SERVER_HOST
needs to be present to have the LND Explorer listen on all interfaces inside the container.

```
docker run -e LND_HOST=lightning -e SERVER_HOST=0.0.0.0 -v /full/path/to/.lnd:/root/.lnd/ -p 8000:8000 lnd-explorer
```

Then just navigate to http://localhost:8000
