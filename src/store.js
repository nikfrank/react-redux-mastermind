import { createStore } from 'redux';


export const initState = {
  code: [1, 2, 3, 4],
  guesses: [],
};



export const reducers = {
  setCode: (state, action)=> ({ ...state, code: action.payload }),
  guess: (state, action)=> ({ ...state, guesses: [...state.guesses, [...state.code] ] }),
};


export const actions = {
  setCode: code => ({ type: 'setCode', payload: code }),
  guess: ()=> ({ type: 'guess' }),
};


export const identity = i => i;


export const reducer = (state = initState, action)=> (
  reducers[action.type] || identity
)(state, action);


export default createStore(reducer);
