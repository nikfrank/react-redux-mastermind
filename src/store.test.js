import store, { actions, reducers } from './store';

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
