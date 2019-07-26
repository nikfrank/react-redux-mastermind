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
});
