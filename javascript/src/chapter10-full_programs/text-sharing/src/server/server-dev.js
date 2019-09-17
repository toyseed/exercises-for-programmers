import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.dev.config';
import textRoute from './routes/api';

const app = express(),
  DIST_DIR = path.join(__dirname, 'public'),
  HTML_FILE = path.join(DIST_DIR, 'index.html'),
  compiler = webpack(config);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));
// app.use(express.static(DIST_DIR));

app.use('/text', textRoute);
app.get('/*', (req, res, next) => {
  res.sendFile(HTML_FILE);
  // compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.set('content-type', 'text/html');
  //   res.send(result);
  //   res.end();
  // });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}`);
  console.log('Press Ctrl + C to quit.');
});
