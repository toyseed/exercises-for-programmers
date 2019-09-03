import * as React from 'react';

export default class DoneList extends React.Component<{ doneList }, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>done</h3>
        {this.props.doneList.map((todo, index) => (
          <div key={index}>{todo.title}</div>
        ))}
      </div>
    );
  }
}
