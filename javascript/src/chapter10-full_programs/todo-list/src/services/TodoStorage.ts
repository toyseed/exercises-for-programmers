export default class TodoStorage {
  private static DB_NAME = 'todo-db';
  private static STORAGE_NAME = 'todoStorage';
  private db;
  private status = {
    initialized: false,
    errorOccurred: false
  };

  constructor() {
    const request = indexedDB.open(TodoStorage.DB_NAME, 2);

    request.onupgradeneeded = event => {
      console.log('onpendb.onupgradeneeded');
      const objectStorage = request.result.createObjectStore(
        TodoStorage.STORAGE_NAME,
        {
          keyPath: 'id',
          autoIncrement: true
        }
      );
      objectStorage.transaction.oncomplete = event => {
        console.log('opendb.onupgradeneeded.transaction.complete');
        this.db = request.result;
        this.status.initialized = true;
      };
    };

    request.onsuccess = event => {
      console.log('onpendb.success');
      this.db = request.result;
      this.status.initialized = true;
    };

    request.onerror = event => {
      console.log('opendb.error');
      this.status.errorOccurred = true;
    };
  }

  private getDB() {
    if (!this.status.initialized && !this.status.errorOccurred) {
      console.log('getdb.wait for initialize');
      return new Promise(resolve => {
        const interval = setInterval(() => {
          if (this.status.initialized) {
            resolve(this.db);
            clearInterval(interval);
          }
        }, 100);
      });
    } else if (this.status.initialized) {
      console.log('getdb.return db');
      return Promise.resolve().then(() => this.db);
    } else {
      console.log('getdb.error occurred');
      throw 'getDB error';
    }
  }

  getTasks() {
    console.log('getTasks');
    return this.getDB().then((db: any) => {
      const storage = db
        .transaction(TodoStorage.STORAGE_NAME, 'readonly')
        .objectStore(TodoStorage.STORAGE_NAME);

      return new Promise((resolve, reject) => {
        const tasks = [];
        const cursor = storage.openCursor();
        cursor.onsuccess = event => {
          let cursor = event.target.result;
          if (cursor) {
            tasks.push(cursor.value);
            cursor.continue();
          } else {
            resolve(tasks);
          }
        };
        cursor.onerror = error => {
          reject(error);
        };
      });
    });
  }

  addTask(title) {
    return this.getDB().then((db: any) => {
      const storage = db
        .transaction(TodoStorage.STORAGE_NAME, 'readwrite')
        .objectStore(TodoStorage.STORAGE_NAME);

      const request = storage.add({ title, done: false });
      request.onsuccess = event => {};
    });
  }

  doneTask(taskId) {
    return this.getDB().then((db: any) => {
      const storage = db
        .transaction(TodoStorage.STORAGE_NAME, 'readwrite')
        .objectStore(TodoStorage.STORAGE_NAME);

      storage.get(taskId).onsuccess = event => {
        const task = event.target.result;
        task.done = true;
        storage.put(task);
      }
    });
  }

  deleteTask(taskId) {
    return this.getDB().then((db: any) => {
      const storage = db
        .transaction(TodoStorage.STORAGE_NAME, 'readwrite')
        .objectStore(TodoStorage.STORAGE_NAME);

      storage.delete(taskId);
    });
  }
}
