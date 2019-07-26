import React from 'react';

import './enzyme-config';
import { mount } from 'enzyme';

import CodeInput from './CodeInput';


it('renders the CodeInput', ()=>{
  const p = mount(<CodeInput />);

  expect(p.html()).toMatch(/div/);
});


it('renders the CodeInput\'s 4 digit code', ()=>{
  const p = mount(<CodeInput />);

  expect(p.html()).toMatch(/(div class=.*){4}/);
});


it('renders the CodeInput\'s 4 digit up & dn buttons', ()=>{
  const onChange = jest.fn();
  
  const p = mount(<CodeInput code={[1, 2, 3, 4]} onChange={onChange} colors={6}/>);

  const buttons = p.find('button');

  expect(buttons).toHaveLength(8);

  // here later we may decide to add a dot selection panel with:
  //   one button for each dot * for each code-slot

  expect(p.find('.up0')).toHaveLength(1);
  p.find('.up0').at(0).simulate('click');
  
  expect( onChange.mock.calls ).toHaveLength( 1 );
  expect( onChange.mock.calls[0][0] ).toEqual([2, 2, 3, 4]);

  expect(p.find('.dn0')).toHaveLength(1);
  p.find('.dn0').at(0).simulate('click');
  
  expect( onChange.mock.calls ).toHaveLength( 2 );
  expect( onChange.mock.calls[1][0] ).toEqual([0, 2, 3, 4]);


  expect(p.find('.up1')).toHaveLength(1);
  p.find('.up1').at(0).simulate('click');
  
  expect( onChange.mock.calls ).toHaveLength( 3 );
  expect( onChange.mock.calls[2][0] ).toEqual([1, 3, 3, 4]);

  expect(p.find('.dn1')).toHaveLength(1);
  p.find('.dn1').at(0).simulate('click');
  
  expect( onChange.mock.calls ).toHaveLength( 4 );
  expect( onChange.mock.calls[3][0] ).toEqual([1, 1, 3, 4]);

  expect(p.find('.up2')).toHaveLength(1);
  p.find('.up2').at(0).simulate('click');
  
  expect( onChange.mock.calls ).toHaveLength( 5 );
  expect( onChange.mock.calls[4][0] ).toEqual([1, 2, 4, 4]);

  expect(p.find('.dn2')).toHaveLength(1);
  p.find('.dn2').at(0).simulate('click');
  
  expect( onChange.mock.calls ).toHaveLength( 6 );
  expect( onChange.mock.calls[5][0] ).toEqual([1, 2, 2, 4]);


  expect(p.find('.up3')).toHaveLength(1);
  p.find('.up3').at(0).simulate('click');
  
  expect( onChange.mock.calls ).toHaveLength( 7 );
  expect( onChange.mock.calls[6][0] ).toEqual([1, 2, 3, 5]);

  expect(p.find('.dn3')).toHaveLength(1);
  p.find('.dn3').at(0).simulate('click');
  
  expect( onChange.mock.calls ).toHaveLength( 8 );
  expect( onChange.mock.calls[7][0] ).toEqual([1, 2, 3, 3]);
});


it('rolls over at the edges', ()=>{
  const onChange = jest.fn();

  const p = mount(<CodeInput code={[0, 0, 5, 5]} onChange={onChange} colors={6}/>);

  p.find('.dn0').at(0).simulate('click');

  expect( onChange.mock.calls ).toHaveLength( 1 );
  expect( onChange.mock.calls[0][0] ).toEqual([ 5, 0, 5, 5 ]);

  
  p.find('.up3').at(0).simulate('click');

  expect( onChange.mock.calls ).toHaveLength( 2 );
  expect( onChange.mock.calls[1][0] ).toEqual([ 0, 0, 5, 0 ]);
});
