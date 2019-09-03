import * as React from 'react';

export default class TodoInput extends React.Component<{onCreate}, {}> {

  constructor(props) {
    super(props);
  }

  // https://stackoverflow.com/questions/36106384/reactjs-typescript-event-this-undefined
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onCreate(event.target.newTodo.value);
    event.target.newTodo.value = '';
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="newTodo" placeholder="add todo" />
        <button type='submit'>Add</button>
      </form>
    );
  }
}
