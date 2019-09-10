
class UrlShorter {
  constructor() {
    this.storage = require('./urlstorage');
    this.idGenerator = require('../helper/idgenerator');
  }

  async add(url) {
    let urlId = await this.storage.findByUrl(url);

    if (urlId) {
      return urlId;
    }

    urlId = this.idGenerator.generate();
    this.storage.add(url, urlId);

    return urlId;
  }

  async findById(id) {
    const url = await this.storage.findById(id);

    if (!url) {
      return null;
    } else {
      return url;
    }
  }
}

module.exports = new UrlShorter();