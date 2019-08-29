/**
 * exercise 51 pushing notes to firebase
 *
 * ref
 *
 * [command line parameter](https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program)
 * [firebase rest guide](https://www.firebase.com/docs/rest/)
 * [how to package](https://github.com/zeit/pkg)
 * [pkg version issue](https://github.com/zeit/pkg/issues/584)
 *    - use `--targets=node10-macos-x64
 *    - command: `npx pkg --targets=node10-macos-x64 ./publish-notes-to-firebase.js`
 */

const axios = require('axios');
require('dotenv').config();

const apiBase = process.env.Firebase_DB_ApiBase;
const dbSecret = process.env.Firebase_DB_Secret;

async function pushNote(note) {
  return await axios({
    url: apiBase + `?auth=${dbSecret}`,
    method: 'POST',
    data: {
      text: note
    }
  }).then(res => {
    return res.data;
  });
}

async function getNotes() {
  return await axios.get(`${apiBase}?auth=${dbSecret}`).then(res => {
    return res.data;
  });
}

(async () => {
  const [, , command, ...words] = process.argv;

  try {
    if (command === 'new') {
      await pushNote(words.join(' '));
    } else if (command === 'show') {
      const notes = await getNotes();
      let i = 1;
      for (let {text: note} of Object.values(notes)) {
        console.log(`${i++}) ${note}`);
      }
    }
  } catch(e) {
    console.log(e);
  }
})();
