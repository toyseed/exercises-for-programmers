/**
 * exercise 44 product search
 */

const fs = require('fs');
const ru = require('../util/read-util');

function readProduct() {
  const content = fs.readFileSync(__dirname + '/product-search.json', {
    encoding: 'utf-8'
  });
  return JSON.parse(content);
}

function writeProduct(products) {
  fs.writeFileSync(__dirname + '/product-search.json', JSON.stringify(products), {encoding: 'utf-8'});
}

const numFormatter = new Intl.NumberFormat('arab', {
  style: 'currency',
  currency: 'USD'
});
function format(num) {
  return numFormatter.format(num);
}

(async () => {
  while (true) {
    let name = await ru.question('What is the product name? ');

    if (name === '') {
      console.log('bye bye.');
      break;
    }
    let data = readProduct();
    let products = data['products'];
    let filtered = products.filter(
      product => product.name.toLowerCase() === name.toLowerCase()
    );

    if (!filtered || filtered.length === 0) {
      console.log('Sorry, that product was not found in our inventory.');
      const addProduct = await ru.question('Do you want to add new product? ');

      if (addProduct && addProduct.toLowerCase() === 'y') {
        let price = await ru.questionForNumber('price: ');
        let quantity = await ru.questionForNumber('quantity: ');

        products.push({name, price, quantity});
        writeProduct(data);
      }
    } else {
      let product = filtered[0];
      console.log(`Name: ${product.name}`);
      console.log(`Price: ${format(product.price)}`);
      console.log(`Quantity on hand: ${product.quantity}`);
    }
  }

  process.exit(0);
})();
