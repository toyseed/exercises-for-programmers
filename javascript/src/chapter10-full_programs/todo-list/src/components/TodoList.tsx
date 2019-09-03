import * as React from 'react';

export default class TodoList extends React.Component<
  { todoList; onTodoDone; onTodoDelete },
  {}
> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div>
        <h3>todo list</h3>
        {this.props.todoList.map((todo, index) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              name="checkDone"
              onClick={() => this.props.onTodoDone(todo.id)}
            />
            {todo.title}
            <button onClick={() => this.props.onTodoDelete(todo.id)}>del</button>
          </div>
        ))}
      </div>
    );
  }
}
