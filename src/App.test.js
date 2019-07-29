import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

import './enzyme-config';
import { mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('mounts to enzyme', ()=>{
  const p = mount(<Provider store={store}><App /></Provider>);

  const state = store.getState();

  expect(state.code).toEqual([1, 2, 3, 4]); // the initState

  p.find('.up0').at(0).simulate('click');
  const state1 = store.getState();
  expect(state1.code).toEqual([2, 2, 3, 4]);

  p.find('.up0').at(0).simulate('click');
  const state2 = store.getState();
  expect(state2.code).toEqual([3, 2, 3, 4]);

  p.find('.dn1').at(0).simulate('click');
  const state3 = store.getState();
  expect(state3.code).toEqual([3, 1, 3, 4]);

  p.find('.dn1').at(0).simulate('click');
  const state4 = store.getState();
  expect(state4.code).toEqual([3, 0, 3, 4]);

  p.find('.dn1').at(0).simulate('click');
  const state5 = store.getState();
  expect(state5.code).toEqual([3, 5, 3, 4]);

  p.find('.up1').at(0).simulate('click');
  const state6 = store.getState();
  expect(state6.code).toEqual([3, 0, 3, 4]);
});


it('guesses the code', ()=>{
  const p = mount(<Provider store={store}><App /></Provider>);

  store.dispatch({ type: 'setSecret', payload: [ 3, 3, 2, 2 ] });
  
  const guessButton = p.find('button.guess');
  expect( guessButton ).toHaveLength( 1 );

  expect( p.find('.result-container') ).toHaveLength( 0 );
  expect( p.find('.score-container') ).toHaveLength( 0 );

  p.find('.up3').at(0).simulate('click');
  p.find('.up3').at(0).simulate('click');
  
  const initState = store.getState();
  
  guessButton.at(0).simulate('click');

  const nextState = store.getState();

  expect( nextState.guesses ).toHaveLength( initState.guesses.length + 1 );

  expect( p.find('.result-container') ).toHaveLength( 1 );
  expect( p.find('.score-container') ).toHaveLength( 1 );

  const resultDots = p.find('.result-container div');

  expect( resultDots.at(0).hasClass('dot-'+initState.code[0]) ).toEqual( true );
  expect( resultDots.at(1).hasClass('dot-'+initState.code[1]) ).toEqual( true );
  expect( resultDots.at(2).hasClass('dot-'+initState.code[2]) ).toEqual( true );
  expect( resultDots.at(3).hasClass('dot-'+initState.code[3]) ).toEqual( true );

  const blackScoreDots = p.find('.score-container div.black');
  const whiteScoreDots = p.find('.score-container div.white');

  expect( blackScoreDots ).toHaveLength( nextState.scores[0][0] );
  expect( whiteScoreDots ).toHaveLength( nextState.scores[0][1] );
});



it('ends the game', ()=>{
  const p = mount(<Provider store={store}><App/></Provider>);

  const state = store.getState();

  store.dispatch({ type: 'setCode', payload: state.secret });

  p.find('button.guess').at(0).simulate('click');

  const guessButtonAfter = p.find('button.guess');

  expect( guessButtonAfter ).toHaveLength( 0 );

  const newGameButton = p.find('button.new-game');

  expect( newGameButton ).toHaveLength( 1 );

  newGameButton.at(0).simulate('click');

  const newGameState = store.getState();

  expect( newGameState.secret ).not.toEqual( state.secret );

  expect( newGameState.scores ).toHaveLength( 0 );
  expect( newGameState.guesses ).toHaveLength( 0 );
});
