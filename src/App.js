import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export const reducer =  (state = 0, action) => {
  console.log({action, state});
  switch(action.type){
    case 'incrementar':{
      return state+1
    }
    case 'decrementar':{
      return state-1
    }
    case 'set':{

      return action.payload
    }
    default: 
      return state
  }
  
}

function App() {
  const [valor, setvalor]= useState('')
  const dispatch= useDispatch()
  const state = useSelector( state => state)
  const set = () => {
    dispatch({type:'set', payload: valor})
    setvalor('')
  }
  return (
    <div className="App">
      <p> Contador: {state}</p>
      <button onClick={() => dispatch({type:'incrementar'})}>Incrementar</button>
      <button onClick={() => dispatch({type:'decrementar'})}>Decrementar</button>
      <button onClick={set}>Set</button>
      <input value={valor} onChange={ e=> setvalor(Number(e.target.value))}/>
    </div>
  );
}

export default App;
