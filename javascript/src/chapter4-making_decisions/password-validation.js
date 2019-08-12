/**
 * TODO: hiding password input
 */
const bcrypt = require('bcrypt');

const storedUser = (() => {
    const username = 'username';
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('password', salt);

    return {username: { hash }};
})();

(async () => {
  const user = await question();

  if (isValidUser(user)) {
      console.log('Welcome!');
  } else {
      console.log('That password is incorrect.');
  }
})();

function isValidUser({ username, password }) {
  const user = storedUser[username];
  return user && bcrypt.compareSync(password, user.hash);
}

async function question() {
  const ru = require('../util/read-util');
  const username = await ru.question('what is the user name: ');
  const password = await ru.question('what is the password: ');
  ru.close();

  return { username, password };
}
