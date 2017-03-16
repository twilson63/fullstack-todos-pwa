import { createStore, applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import reduxThunk from 'redux-thunk'
import PouchDB from 'pouchdb'
import { map, prop } from 'ramda'

const db = PouchDB('todos2')

const LIST_TODOS = 'LIST_TODOS'

const rootReducer = (state = { todos: [] }, action) => {
  switch (action.type) {
    case LIST_TODOS:
      return {...state, todos: action.payload }
    default:
      return state
  }
}

const store = createStore(rootReducer, applyMiddleware(reduxThunk))

const listDocs = () =>
  db.allDocs({ include_docs: true })
    .then(res => map(prop('doc'), res.rows))

const mapStateToProps = (state) => {
  return { todos: state.todos }
}
const mapDispatchToProps = (dispatch) => {
  return {
    list: () => {
      return listDocs().then(docs => dispatch({type: LIST_TODOS, payload: docs}))
    },
    add: (todo) => {
      return db.post(todo)
        .then(res => {
          if (res.ok) {
            listDocs().then(docs => dispatch({type: LIST_TODOS, payload: docs}))
          }
        })
    }
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export { store, connector }
