import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  entities: []
}
export const reducer =  (state = initialState, action) => {

    switch(action.type) {
      case 'todo/add': {
        console.log('reducer')
        return {
          ...state,
          entities:state.entities.concat({...action.payload})
        }
      }
      default:
        return state
    }
}
const TodoItem = ({todo}) => {
  return (
    <li>{todo.tittle}</li>
  )
}
function App() {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const state= useSelector(x=>x)
  console.log({state})

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
      <button>Mostrar Todos</button>
      <button>Completados</button>
      <button>Incompletos</button>


      <ul>
        {state.entities.map(todo => <TodoItem key={todo.id} todo={todo}></TodoItem>)}
      </ul>
    </div>
  );
}

export default App;
