/**
 * exercise 43 website generator
 */

const ru = require('../util/read-util');
const fs = require('fs');
const renderHTML = function(siteName, author) {
  return `
  <!doctype html>
  <html lang="en">
  <head>
  <title>${siteName}</title>
  <meta name="author" content="${author}">
  </head>
  <body></body>
  </html>
  `;
};

(async () => {
  const siteName = await ru.question('Site name: ');
  const author = await ru.question('Author: ');
  const needJsDir = await ru.question(
    'Do you want a folder for javascript? (Y/n) '
  );
  const needCssDir = await ru.question('Do you want a folder for css? (Y/n) ');

  const siteDirPath = __dirname + '/' + siteName;

  if (fs.existsSync(siteDirPath)) {
    // not work cause of child dir
    // https://stackoverflow.com/questions/8496212/node-js-fs-unlink-function-causes-eperm-error
    const replace = await ru.question('existing folder. want to replace? ');

    if (replace && replace.toLowerCase() === 'y') {
      const result = await (() =>
        new Promise((resolve, reject) => {
          fs.rmdir(siteDirPath, err => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        })
          .then(() => true)
          .catch(err => console.log(err)))();

      if (result !== true) {
        console.log('delete dir fail.');
        process.exit(-1);
      }
    } else {
      process.exit(0);
    }
  }

  try {
    fs.mkdirSync(siteDirPath);
    console.log(`Created ./${siteName}`);

    fs.writeFileSync(siteDirPath + '/index.html', renderHTML(siteName, author));
    console.log(`Created ./${siteName}/index.html`);

    if (needJsDir === '' || needJsDir.toLowerCase() === 'y') {
      fs.mkdirSync(siteDirPath + '/js');
      console.log(`Created ./${siteName}/js/`);
    }

    if (needCssDir === '' || needCssDir.toLowerCase() === 'y') {
      fs.mkdirSync(siteDirPath + '/css');
      console.log(`Created ./${siteName}/css/`);
    }

  } catch (e) {
    console.log(e);
    process.exit(-1);
  }

  process.exit(0);
})();
