import React from "react";
import { useObserver } from "mobx-react";

function TodoList( props ) {
  function createNew( event ) {
    if ( event.which === 13 ) {
      props.store.createTodo( event.target.value )
      event.target.value = ""
    }
  }

  function filterStore( event ) {
    props.store.filter = event.target.value
  }

  function toggleComplete( todo ) {
    todo.complete = !todo.complete
  }

  const { clearComplete, filter, filteredTodos } = props.store;

  const todoLis = filteredTodos.map(todo => (
    <li key={ todo.id }>
      <input type="checkbox" onChange={ () => toggleComplete( todo ) } value={ todo.complete } checked={ todo.complete } />
      <span>{ todo.value }</span>
    </li>
  ))

  return useObserver( () => (
    <div>
      <h1>todos</h1>
      <input className="new" onKeyPress={ createNew } />
      <input className="filter" value={ filter } onChange={ () => filterStore() } />
      <ul>{todoLis}</ul>
      <a href="#" onClick={ clearComplete }>Clear Complete</a>
    </div>
  ) );
}

export default TodoList;

