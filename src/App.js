import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";

export const asyncMiddleware = store => next => action =>{
  if( typeof action === 'function'){
    return action(store.dispatch, store.getState)
  }
  return  next(action)
}
export const  fetchThunk = () => dispatch => {
  console.log('soy un thunk sea lo que sea eso que mi profe hipster dice')
}
export const filterReducer=(state= 'all', action) => {
  switch(action.type) {
    case 'filter/set':{
      return  action.payload      
    }
    default:
      return state
    
    }
}
export const todoReducer=(state= [], action) => {
  switch(action.type) {
    case 'todo/add': {
      console.log('reducer')
      return  state.concat({...action.payload})
      
    }
    case 'todo/complete' : {
      const newTodos= state.map(todo => {
        if(todo.id === action.payload.id){
          return {...todo, completed: !todo.completed}
        }
        return todo
      })
      return newTodos      
    }

    default:
      return state
  }
}

export const reducer= combineReducers({
  entities: todoReducer,
  filter: filterReducer
})

const selectToDos= state => {
  const {entities, filter} = state
  if(filter === 'complete'){
    return entities.filter(todo => todo.completed)
  }
  if(filter === 'incomplete'){
    return entities.filter(todo => !todo.completed)
  }
  return entities
}
const TodoItem = ({todo}) => {
  const dispatch = useDispatch()

  return (    
    <li 
    style={{textDecoration: todo.completed? 'line-through' : 'none'}}
    onClick={()=> dispatch({type: 'todo/complete',payload: todo})}>
      {todo.tittle}
    </li>
  )
}
function App() {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const todos= useSelector(selectToDos)

  const submit = (e) => {
    e.preventDefault()
    if(!value.trim()){
      return
    }
    const id = Math.random().toString(36)
    const todo = {tittle: value, complete: false, id}
    dispatch({type: 'todo/add', payload: todo})
    setValue('')
  }
return (
    <div className="App">
      <form onSubmit={submit}>
        <input value= {value} onChange= {e => setValue(e.target.value)}></input>
      </form >
      <button onClick={() => dispatch({type:'filter/set', payload: 'all'})}>Mostrar Todos</button>
      <button onClick={() => dispatch({type:'filter/set', payload: 'complete'})}>Completados</button>
      <button onClick={() =>  dispatch({type:'filter/set', payload: 'incomplete'})}>Incompletos</button>
      <button onClick={() =>  dispatch(fetchThunk())}>Fetch</button>


      <ul>
        {todos.map(todo => <TodoItem key={todo.id} todo={todo}></TodoItem>)}
      </ul>
    </div>
  );
}

export default App;
