const fs = require('fs');
const path = require('path');

class InventoryStorage {
  constructor() {
    this.dataFilePath = path.join(__dirname, 'data');
    if (!fs.existsSync(this.dataFilePath)) {
      // fs.closeSync(fs.openSync(this.dataFilePath, 'w'));
      this.inventory = [];
      this.writeToFile(this.inventory);
    } else {
      const fileContent = fs.readFileSync(this.dataFilePath, {encoding: 'utf-8'});
      this.inventory = JSON.parse(fileContent);
    }
  }

  getAll() {
    return [...this.inventory];
  }

  find(option) {
    return this.inventory.filter(item => {
      return item[option.key] === option.value;
    })
  }

  add({name, serialNumber, value}) {
    this.inventory.push({name, serialNumber, value});
    this.writeToFile(this.inventory);
  }

  writeToFile(inventory) {
    fs.writeFileSync(this.dataFilePath, JSON.stringify(this.inventory), {encoding: 'utf-8'});
  }
}

const inventoryStorage = new InventoryStorage();
module.exports = {
  getAll: inventoryStorage.getAll.bind(inventoryStorage),
  find: inventoryStorage.find.bind(inventoryStorage),
  add: inventoryStorage.add.bind(inventoryStorage)
};