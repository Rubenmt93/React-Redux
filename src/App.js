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
          entities:[{}]
        }
      }
    }
      return state
  
  
}

function App() {
  const dispatch = useDispatch()
  const state= useSelector(x=>x)
  console.log(state, 'Rendering')
  return (
    <div className="App">
      <form >
        <input></input>
        </form>
        <button onClick={() => dispatch({type: 'todo/add'})}>Mostrar Todos</button>
        <button>Completados</button>
        <button>Incompletos</button>
      

      <ul>
        <li>To do 1</li>
        <li>To do 2</li>
      </ul>
    </div>
  );
}

export default App;
