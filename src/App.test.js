import React from 'react';
import ReactDOM from 'react-dom';
import App, { App as RawApp } from './App';

import { Provider } from 'react-redux';
import store from './store';

import './enzyme-config';
import { mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('munts to enzyme', ()=>{
  const p = mount(<RawApp code={[1, 2, 3, 4]}/>);

  console.log(p.html());
});
