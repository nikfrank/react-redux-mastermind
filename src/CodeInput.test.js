import React from 'react';

import './enzyme-config';
import { mount } from 'enzyme';

import CodeInput from './CodeInput';


it('renders the CodeInput', ()=>{
  const p = mount(<CodeInput />);

  expect(p.html()).toMatch(/div/);
});
