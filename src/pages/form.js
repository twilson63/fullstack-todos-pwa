import React, { Component } from 'react'
import { connector } from '../store'

class TodoForm extends Component {
  constructor() {
    super()
    this.state = {
      todoText: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }
  handleSubmit (e) {
    e.preventDefault()
    this.props.add({text: this.state.todoText, completed: false})
    this.setState({ todoText: ''})
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          autoComplete="off"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus={true}
          value={this.state.todoText}
          name="todoText"
          onChange={this.handleChange}
        />
      </form>
    )
  }
}

export default connector(TodoForm)
