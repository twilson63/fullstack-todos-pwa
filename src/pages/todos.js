import React, { Component } from 'react'
import { connector } from '../store'
import { map } from 'ramda'

class Todos extends Component {
  componentDidMount () {
    this.props.list()
  }
  handleChange (e) {
    
  }
  render() {
    const todoLI = todo => {
      return (
        <li className={todo.completed ? 'completed' : ''} key={todo._id}>
          <div className="view">
            <input className="toggle" type="checkbox" />
            <label>{todo.text}</label>
            <button className="destroy"></button>
          </div>
          <input className="edit" value={todo.text} onChange={this.handleChange} />
        </li>
      )
    }
    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {map(todoLI, this.props.todos)}
        </ul>
        <footer className="footer">
          <span className="todo-count"><strong>0</strong> item left</span>
          <ul className="filters">
            <li>
              <a className="selected" href="#/">All</a>
            </li>
            <li>
              <a href="#/active">Active</a>
            </li>
            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>

    )
  }
}

export default connector(Todos)
