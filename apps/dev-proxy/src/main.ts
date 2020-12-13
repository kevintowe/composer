// THIS LINE MUST RUN FIRST!!!
if (process.env.NODE_ENV !== 'production')
  require('dotenv').config({ path: 'apps/dev-proxy/.env' });

import * as express from 'express';
import * as httpProxy from 'express-http-proxy';

const app = express();
const host = `http://localhost`;

const oauthServiceProxy = httpProxy(`${host}:3010`);
const webhookServiceProxy = httpProxy(`${host}:3040`);

// Authentication
app.use((req, res, next) => {
  // TODO: authentication logic
  next();
});

// Proxy request
app.get('/oauth', (req, res, next) => {
  oauthServiceProxy(req, res, next);
});
app.post('/webhook', (req, res, next) => {
  webhookServiceProxy(req, res, next);
});

// Determine port and listen for request
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Dev Proxy listening at ${host}:${port}`);
});
