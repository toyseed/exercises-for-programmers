import * as React from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import DoneList from './DoneList';
import TodoService from '../services/TodoService';
import TodoStorage from '../services/TodoStorage';

export default class Todo extends React.Component<{}, { todoList }> {
  private todoService;
  private todoStorage: TodoStorage;
  // https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component
  private _isMounted: boolean;

  constructor(props) {
    super(props);
    this.state = {
      todoList: []
    };
    this.todoService = new TodoService();
    this.todoStorage = new TodoStorage();

  }

  componentDidMount(): void {
    console.log('componentDidMount');
    this._isMounted = true;
    this.todoStorage.getTasks().then((items: []) => {
      if (this._isMounted) {
        console.log('componentDidMount.setState');
        this.setState({
          todoList: [...items]
        });
      }
    });
  }

  componentWillUnmount(): void {
    console.log('componentDidUnmount');
    this._isMounted = false;
  }

  handleInput = title => {
    this.handleTask(() => {
      return this.todoStorage.addTask(title);
    });
  };

  handleDone = todoId => {
    this.handleTask(() => {
      return this.todoStorage.doneTask(todoId);
    });
  };

  handleDelete = todoId => {
    this.handleTask(() => {
      return this.todoStorage.deleteTask(todoId);
    });
  };

  handleTask = (handler: () => Promise<any>) => {
    handler().then(() => {
      return this.todoStorage.getTasks();
    }).then((tasks: []) => {
      this.setState({
        todoList: [...tasks]
      });
    });
  };

  getTodo = () => this.state.todoList.filter(todo => !todo.done);
  getDone = () => this.state.todoList.filter(todo => todo.done);

  render() {
    return (
      <div>
        <TodoInput onCreate={this.handleInput} />
        <TodoList
          todoList={this.getTodo()}
          onTodoDone={this.handleDone}
          onTodoDelete={this.handleDelete}
        />
        <DoneList doneList={this.getDone()} />
      </div>
    );
  }
}
