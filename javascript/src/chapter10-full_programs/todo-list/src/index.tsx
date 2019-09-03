import * as React from 'react';
import { render } from 'react-dom';
import Todo from './components/Todo';

const App = () => {
  return (
    <div id="wrapper">
      <Todo />
    </div>
  );
};

render(<App />, document.getElementById('app'));
