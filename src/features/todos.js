import { combineReducers } from "redux"
import {makefetchingReducer, makeSetReducer}from './utils.js'
export const setPending = () => {return {type: 'pending'}}
export const setFullFilled = payload =>({ type: 'todos/fullfilled', payload})
export const setError = e => ({type: 'todos/error', error: e.message})
export const setComplete = payload => ({type: 'todos/complete',payload})
export const setFilter = payload => ({type:'filter/set', payload})


export const  fetchThunk = () => async dispatch => {
    dispatch(setPending())
    try{
        const response =  await fetch('https://jsonplaceholder.typicode.com/todos')
        const data= await response.json();
        const todos = data.slice(0,10)
       
          
        dispatch(setFullFilled(todos))
  
    }catch (e){
      dispatch(setError())
    }
  }


  

  

export const filterReducer = makeSetReducer(['filter/set'])
export const fetchingReducer = makefetchingReducer([
  'todos/pending',
  'todos/fullfiled',
  'todos/errors',
])
  
export const todosReducer=(state= [], action) => {
switch(action.type) {
    case 'todos/add': {
    console.log('reducer')
    return  state.concat({...action.payload})
    
    }
    case 'todos/complete' : {
    const newTodos= state.map(todo => {
        if(todo.id === action.payload.id){
        return {...todo, completed: !todo.completed}
        }
        return todo
    })
    return newTodos      
    }
    case 'todos/fullfilled': {
    return action.payload
    }

    default:
    return state
}
}
  
export const reducer= combineReducers({
    todos: combineReducers({
    entities: todosReducer,
    status: fetchingReducer,
    }),
    filter: filterReducer
})
  
export const selectToDos= state => {
    const {todos:{entities}, filter} = state
    if(filter === 'complete'){
      return entities.filter(todo => todo.completed)
    }
    if(filter === 'incomplete'){
      return entities.filter(todo => !todo.completed)
    }
    return entities
  }
  
 export const selectStatus = state => state.todos.status
  