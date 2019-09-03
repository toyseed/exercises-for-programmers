export default class TodoService {
  private tasks: Array<any> = [];
  private id: number;

  constructor() {
    this.id = 0;
    this.tasks.push({ id: this.id++, title: 'task 1', done: false });
    this.tasks.push({ id: this.id++, title: 'task 2', done: false });
    this.tasks.push({ id: this.id++, title: 'task 3', done: true });
    this.tasks.push({ id: this.id++, title: 'task 4', done: false });
    this.tasks.push({ id: this.id++, title: 'task 5', done: true });
    this.tasks.push({ id: this.id++, title: 'task 6', done: false });
  }

  getTasks() {
    return Promise.resolve().then(() => {
      return this.tasks;
    });
  }

  addTask(title) {
    return Promise.resolve().then(() =>
      this.tasks.push({ id: this.id++, title, done: false })
    );
  }

  doneTask(taskId) {
    return Promise.resolve().then(() => {
      const task = this.tasks.find(task => task.id === taskId);
      task.done = true;
    });
  }

  deleteTask(todoId) {
    return Promise.resolve().then(() => {
      this.tasks.splice(this.tasks.findIndex(task => task.id === todoId), 1);
    });
  }
}
