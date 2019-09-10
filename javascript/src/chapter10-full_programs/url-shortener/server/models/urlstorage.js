class UrlStorage {
  constructor(host, port) {
    // https://github.com/NodeRedis/node_redis
    const redis = require('redis');
    this.urlStorage= redis.createClient({
      host: host,
      port: port,
      prefix: 'url'
    });
    this.idStorage = redis.createClient({
      host: host,
      port: port,
      prefix: 'id'
    });
  }

  findByUrl(url) {
    return new Promise((resolve, reject) => {
      this.urlStorage.get(url, (err, value) => {
        resolve(value);
      });
    })
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      this.idStorage.get(id, (err, value) => {
        resolve(value);
      });
    })
  }

  add(url, id) {
    this.urlStorage.set(url, id);
    this.idStorage.set(id, url);
  }
}

require('dotenv').config();
module.exports = new UrlStorage(process.env.REDIS_HOST, process.env.REDIS_PORT);