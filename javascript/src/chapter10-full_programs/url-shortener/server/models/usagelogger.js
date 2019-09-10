class UsageLogger {
  constructor() {
    this.usageStorage = require('./usagestorage');
  }

  logMakeUrl(url) {
    try {
      this.usageStorage.addMake(url);
    } catch(e) {
      console.log(e);
    }
  }

  logVisitUrl(url) {
    this.usageStorage.addVisit(url);
  }

  async findUsage(url) {
    return await this.usageStorage.read(url);
  }
}

module.exports = new UsageLogger();