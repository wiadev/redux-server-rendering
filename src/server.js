import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressGraphQL from 'express-graphql';
import React from 'react';
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import multer from 'multer';
import cloudinary from 'cloudinary';
import cors from 'cors';
import proxy from 'express-http-proxy';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import schema from './data/schema';
import routes from './routes';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import { port, apiHost } from './config';
import { API_KEY } from './constants/apiKey';

import configStore from './server/config-store';
import auth from './server/auth';
import userProperties from './server/user-properties';
import documentUpload from './server/document-upload';
import imageUpload from './server/image-upload';
import apiproxy from './server/api-proxy';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

/**
  * Bizly Cloudinary config
  * Used for file uploads directly to CDN
*/
cloudinary.config({
  cloud_name: 'hdd626jg7',
  api_key: '496824411255846',
  api_secret: 'CgpKC-d4gDGrfTpqDKacCkyTvgs',
});

/**
  * Multer config for gile upload
  * All file are being saved in /uploads folder temporarily
  * Unique filenames are given based on original file name
*/
const storage = multer.diskStorage({
  destination: './tmp',
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json({ limit: 1024 * 1024 * 10, parameterLimit: 10000 }));
app.use(bodyParser.urlencoded({ limit: 1024 * 1024 * 10, extended: true, parameterLimit: 10000 }));


//
// Register GraphQL middleware
// -----------------------------------------------------------------------------
app.use('/graphql', cors(), expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));

// Register custom middleware
app.use(configStore);
app.use(auth);
app.use(userProperties);

/**
  * Proxying API calls to Bizly API
  * Sometimes there is no need for GraphQL, especially POST requests
*/

/**
proxy(apiHost, {
  reqBodyEncoding: null,
  timeout: 2000,

  decorateRequest: function(proxyReq, originalReq) {
    proxyReq.headers = {
      'Authorization': `Bearer ${req.cookies.auth_token}`,
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    };
    console.log(proxyReq.headers);
    return proxyReq;
  },
**/

app.use('/api', apiproxy);

// Register file upload routes with custom middleware
app.post('/documents', upload.single('file'), documentUpload);
app.post('/images', upload.single('file'), imageUpload);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const store = req.store;
    const css = new Set();
    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      // Initialize a new Redux store
      // http://redux.js.org/docs/basics/UsageWithReact.html
      store,
    };

    const route = await UniversalRouter.resolve(routes, {
      ...context,
      path: req.path,
      query: req.query,
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(<App context={context}>{route.component}</App>);
    data.style = [...css].join('');
    data.script = assets.main.js;
    data.state = context.store.getState();
    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);

    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      style={errorPageStyle._getCss()} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});
/* eslint-enable no-console */
