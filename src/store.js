import { createStore } from 'redux';


export const initState = {
  code: [1, 2, 3, 4],
};



export const reducers = {
  
};

export const identity = i => i;


export const reducer = (state = initState, action)=> (
  reducers[action.type] || identity
)(state, action);


export default createStore(reducer);
