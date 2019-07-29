import store, { actions, reducers } from './store';
import score from './score';

it('has an initial state, can set code', ()=>{
  const initState = store.getState();

  expect(typeof initState).toEqual('object');

  expect(Array.isArray(initState.code)).toEqual(true);

  const nextCode = [ 4, 1, 3, 0 ];
  const setCodeAction = actions.setCode( nextCode );

  store.dispatch( setCodeAction );

  const state = store.getState();

  expect( state.code ).toEqual( nextCode );
});


it('reduces the next code into the state', ()=>{
  const nextCode = [5, 5, 3, 0];
  const setNextCodeAction = actions.setCode(nextCode);

  const initState = { code: [1, 2, 3, 4] };
  const nextState = reducers.setCode(initState, setNextCodeAction);

  expect( nextState.code ).toEqual( nextCode );
});


it('puts the guesses in the state', ()=>{
  const initState = store.getState();
  expect( Array.isArray(initState.guesses) ).toEqual( true );

  const guessAction = actions.guess();
  
  const nextState = reducers.guess(initState, guessAction);

  expect( nextState.guesses ).toEqual( [...initState.guesses, initState.code] );
});


it('puts the secret and scores in the state', ()=>{
  const initState = store.getState();

  const setSecretAction = actions.setSecret([2, 2, 0, 5]);
  const stateWithSecret = reducers.setSecret( initState, setSecretAction );
  
  expect( Array.isArray(stateWithSecret.guesses) ).toEqual( true );
  expect( Array.isArray(stateWithSecret.scores) ).toEqual( true );
  expect( Array.isArray(stateWithSecret.secret) ).toEqual( true );

  const setCodeAction = actions.setCode([ 2, 5, 0, 3 ]);
  const stateWithCode = reducers.setCode( stateWithSecret, setCodeAction );
  
  const guessAction = actions.guess();
  
  const nextState = reducers.guess(stateWithCode, guessAction);

  expect( nextState.guesses ).toEqual( [...stateWithCode.guesses, stateWithCode.code] );
  expect( nextState.scores ).toEqual( [...stateWithCode.scores, score(stateWithCode.secret)(stateWithCode.code) ] );

  expect( nextState.code ).toEqual( [ 0, 0, 0, 0 ] );
});



it('makes a new game', ()=>{
  const initState = store.getState();

  const setSecretAction = actions.setSecret([2, 2, 0, 5]);
  const stateWithSecret = reducers.setSecret( initState, setSecretAction );

  const setCodeAction = actions.setCode([2, 2, 0, 5]);
  const correctCodeState = reducers.setCode( stateWithSecret, setCodeAction );

  const guessAction = actions.guess();
  const doneGameState = reducers.guess( correctCodeState, guessAction );

  expect( doneGameState.scores.reverse()[0] ).toEqual([ 4, 0 ]);
  
  const newGameAction = actions.newGame();
  const nextGameState = reducers.newGame( doneGameState, newGameAction );

  expect( nextGameState.secret ).not.toEqual( doneGameState.secret );
  expect( nextGameState.scores ).toHaveLength( 0 );
  expect( nextGameState.guesses ).toHaveLength( 0 );
});
