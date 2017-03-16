import React, { Component } from 'react';
import Todos from './pages/todos'
import TodoForm from './pages/form'

import { Provider } from 'react-redux'
import { store } from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <TodoForm />
          </header>
          <Todos />
        </section>
      </Provider>
    );
  }
}

export default App;
