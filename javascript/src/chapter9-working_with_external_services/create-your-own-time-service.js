/**
 * exercise 52 create your own time service
 */

const url = require('url');
const randomText = `ANGUS. Near Birnam Wood
    Shall we well meet them; that way are they coming.
  CAITHNESS. Who knows if Donalbain be with his brother?
  LENNOX. For certain, sir, he is not; I have a file
    Of all the gentry. There is Seward's son
    And many unrough youths that even now
    Protest their first of manhood.
  MENTEITH. What does the tyrant?
  CAITHNESS. Great Dunsinane he strongly fortifies.
    Some say he's mad; others, that lesser hate him,
    Do call it valiant fury; but, for certain,
    He cannot buckle his distemper'd cause
    Within the belt of rule`.split(/\n\s{2}\b/);

require('http')
  .createServer((req, res) => {
    const reqUrl = url.parse(req.url);
    const pathName = reqUrl.pathname;

    let resBody = '';
    if (pathName === "/current-time") {
      res.setHeader('contentType', 'application/json');
      resBody = { currentTime: new Date().toString() };
    } else {
      res.setHeader('contentType', 'text/plain');
      const index = Math.floor(Math.random() * randomText.length);
      resBody = randomText[index];
    }
    res.end(JSON.stringify(resBody));
  })
  .listen(8080, () => {
    console.log('listening on 8080...');
  });
