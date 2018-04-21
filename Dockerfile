FROM node:alpine

COPY . /lnd-explorer

WORKDIR /lnd-explorer

RUN npm install \
&&  npm run build

CMD npm start
