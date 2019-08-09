const ru = require('../util/read-util');

(async () => {
    let items = [];
    let index = 1;

    while(true) {
        let price = await ru.questionForNumber(`Price of item ${index}: `);
        if (price === '') {
            break;
        }
        let quantity = await ru.questionForNumber(`Quantity of item ${index}: `);
        if (quantity === '') {
            break;
        }

        items.push({price, quantity});
        index++;
    }

    if (items.length === 0) {
        console.log('no items');
    } else {
        const result = calc(items);
        console.log('Subtotal: $', result.subtotal);
        console.log('Tax: $', result.tax);
        console.log('Total: $', result.total);
    }

    ru.close();
})();

const taxRate = 5.5 / 100;
function calc(items) {
    const subtotal = items.map(({price, quantity}) => price * quantity)
        .reduce((sum, price) => sum + price, 0);
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return {subtotal, tax, total};
}