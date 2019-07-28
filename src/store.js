import { createStore } from 'redux';
import score from './score';

export const initState = {
  code: [1, 2, 3, 4],
  guesses: [],
  scores: [],
  secret: [0, 0, 0, 1],
};


export const reducers = {
  setSecret: (state, action)=> ({ ...state, secret: action.payload, scores: [] }),
  setCode: (state, action)=> ({ ...state, code: action.payload }),
  guess: (state, action)=> ({
    ...state,
    guesses: [...state.guesses, [...state.code] ],
    scores: [...state.scores, score(state.secret)(state.code) ],
    code: [0, 0, 0, 0],
  }),
};


export const actions = {
  setSecret: secret=> ({ type: 'setSecret', payload: secret }),
  setCode: code => ({ type: 'setCode', payload: code }),
  guess: ()=> ({ type: 'guess' }),
};


export const identity = i => i;


export const reducer = (state = initState, action)=> (
  reducers[action.type] || identity
)(state, action);


export default createStore(reducer);
