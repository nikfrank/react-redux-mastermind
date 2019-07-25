import React from 'react';
import './App.css';

import { connect } from 'react-redux';

export const App = ({ code })=> (
  <div className="App">
    {code}
  </div>
);

export default connect(state => state)(App);
