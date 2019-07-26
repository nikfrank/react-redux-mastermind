import React from 'react';
import './App.css';

import { connect } from 'react-redux';

import { actions } from './store';

import CodeInput from './CodeInput';


export const App = ({ code, setCode })=> console.log(code)||(
  <div className="App">
    <CodeInput code={code} onChange={setCode} colors={6}/>
  </div>
);

export default connect(state => state, actions)(App);
