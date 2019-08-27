/**
 * exercise 49 filckr photo search
 */

const http = require('http');
const url = require('url');
const fs = require('fs');
const https = require('https');

const handlerMap = {
  '/' : (request, response) => {
    response.end(fs.readFileSync('./flickr-photo-search.html', {encoding: 'utf-8'}));
  },
  '/flickr' : (request, response) => {
    const reqUrl = url.parse(request.url);
    const query = reqUrl.query;

    const [queryKey, queryValue] = query.split('=');
    new Promise((resolve, reject) => {
      https.get(`https://www.flickr.com/services/feeds/photos_public.gne?tag=${queryValue}`, response => {
        const body = [];
        response.on('data', chunk => body.push(chunk));
        response.on('end', () => {
          const raw = body.join('');
          resolve(raw);
        });
        response.on('error', error => {
          reject(error);
        });
      })
    }).then(body => {
      response.end(body);
    });
  }
}

const listener = (request, response) => {
  const reqUrl = url.parse(request.url);
  const handler = handlerMap[reqUrl.pathname];

  if (handler) {
    const result = handler(request, response);
  } else {
    response.statusCode = 404;
    response.end('<h1>not found</h1>');
  }
}

const server = http.createServer((request, response) => {
  listener(request, response);
}).listen(8080).on('listening', () => {
  console.log('listening on 8080...');
});
