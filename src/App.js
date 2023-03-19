import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setComplete, fetchThunk, selectToDos, selectStatus } from './features/todos'



const TodoItem = ({todo}) => {
  const dispatch = useDispatch()

  return (    
    <li 
    style={{textDecoration: todo.completed? 'line-through' : 'none'}}
    onClick={()=> dispatch(setComplete(todo))}>
      {todo.title}
    </li>
  )
}
function App() {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const todos= useSelector(selectToDos)
  const status= useSelector(selectStatus)

  
  const submit = (e) => {
    e.preventDefault()
    if(!value.trim()){
      return
    }
    const id = Math.random().toString(36)
    const todo = {title: value, complete: false, id}
    dispatch({type: 'todos/add', payload: todo})
    setValue('')
  }

  // if(status.loading === 'pending'){   
  //    return <p> Cargando...</p>
  // }
   if(status.loading === 'rejected'){   
    return <p> {status.error}</p>
  }

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input value= {value} onChange= {e => setValue(e.target.value)}></input>
      </form >
      <button onClick={() => dispatch(setFilter('all'))}>Mostrar Todos</button>
      <button onClick={() => dispatch(setFilter('complete'))}>Completados</button>
      <button onClick={() =>  dispatch(setFilter('incomplete'))}>Incompletos</button>
      <button onClick={() =>  dispatch(fetchThunk())}>Fetch</button>


      <ul>
        {todos.map(todo => <TodoItem key={todo.id} todo={todo}></TodoItem>)}
      </ul>
    </div>
  );
}

export default App;
