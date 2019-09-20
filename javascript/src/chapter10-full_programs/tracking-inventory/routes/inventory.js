const storage = require('../storage/inventoryStorage');
const ejs = require('ejs');
const express = require('express');
const router = express.Router();
const EOL = require('os').EOL;

router.get('/', (req, res, next) => {
  const inventory = storage.getAll().map(item => {
    return {
      name: item.name,
      serialNumber: item.serialNumber,
      price: `\$${Number(item.value).toFixed(2)}`
    };
  });

  res.render('inventory', {
    inventory
  });
});

router.post('/inventory', (req, res, next) => {
  const name = req.body.name;
  const serialNumber = req.body.serialNumber;
  const value = req.body.value;

  if (!name || !serialNumber || !value) {
    res.status(400);
    next();
  } else {
    storage.add({ name, serialNumber, value });
    res.redirect('/');
  }
});

router.get('/download/:type', (req, res, next) => {
  const type = req.params.type;
  const inventory = storage.getAll();

  let content = '';
  if (type === 'csv') {
    content = makeCSVContent(inventory);
  } else {
    content = makeHTMLContent(inventory);
  }

  const buffer = Buffer.from(content, 'utf-8');
  res.writeHead(200, {
    'Content-Type': 'plain/text',
    'Content-Disposition': 'attachment; filename=inventory.' + type,
    'Content-Length': buffer.length
  });

  res.end(buffer);
});

function makeCSVContent(inventory) {
  let content = '';

  for (let item of inventory) {
    content += `${item.name},${item.serialNumber},\$${Number(
      item.value
    ).toFixed(2)}${EOL}`;
  }

  return content;
}

const htmlTemplate = `
<!doctype html>
<html>
    <head></head>
    <body>
        <table>
            <tr><th>Name</th><th>Serial Number</th><th>Value</th></tr>
            <% inventory.forEach(item => { %>
            <tr><td><%=item.name%></td><td><%=item.serialNumber%></td><td><%=item.value%></td></tr>
            <% }); %>
        </table>
    </body>
</html>
`;

function makeHTMLContent(inventory) {
  const formated = inventory.map(item => {
    return {
      name: item.name,
      serialNumber: item.serialNumber,
      value: `\$${Number(item.value).toFixed(2)}`
    };
  });

  try {
    return ejs.render(htmlTemplate, {
      inventory: formated
    });
  } catch(e) {
    console.log(e);
    next(e);
  }
}

module.exports = router;
