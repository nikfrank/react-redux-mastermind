import React from 'react';
import './App.css';

import { connect } from 'react-redux';

import { actions } from './store';

import CodeInput from './CodeInput';


export const App = ({ code, setCode, guess })=> (
  <div className="App">
    <div className='guess-container'>
      <CodeInput code={code} onChange={setCode} colors={6}/>
    </div>
    <button className='guess' onClick={guess}>GUESS</button>
  </div>
);

export default connect(state => state, actions)(App);
