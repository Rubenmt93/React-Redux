import { combineReducers } from "redux"
import {makefetchingReducer, makeSetReducer, reduceReducer, makeCrudReducer}from './utils.js'


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

const fullfiledReducer= makeSetReducer(['todos/fullfilled'])
  
const crudReducer = makeCrudReducer(['todos/add','todos/complete'])

export const todosReducer =reduceReducer(crudReducer,fullfiledReducer)

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
  