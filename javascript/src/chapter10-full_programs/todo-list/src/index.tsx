import * as React from 'react';
import { render } from 'react-dom';
import { TodoList } from './components';

const App = () => {
  return (
    <div id='wrapper'>
      <TodoList />
    </div>
  )
}
render(<App />, document.getElementById('app'));