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
