import React from 'react';
import './App.css';

import { connect } from 'react-redux';

import { actions } from './store';

import CodeInput from './CodeInput';


export const App = ({ code, guesses, scores, setCode, guess, newGame })=> (
  <div className="App">
    <div className='guess-container'>
      <CodeInput code={code} onChange={setCode} colors={6}/>
    </div>

    {(scores[scores.length-1]||[])[0] !== 4 ? (
       <button className='guess' onClick={guess}>GUESS</button>
    ) : (
       <button className='new-game' onClick={newGame}>NEW GAME</button>
    )}
    {guesses.map((guess, i)=> (
      <div key={i}>
        <div className='result-container guess-container'>
          {guess.map((g, gi)=> (
            <div className={'dot-'+g} key={gi}/>
          ))}
        </div>
        <div className='score-container'>
          {[...Array(scores[i][0])].map((s, si)=> (
            <div className='black' key={si}/>
          ))}
          {[...Array(scores[i][1])].map((s, si)=> (
            <div className='white' key={si}/>
          ))}
        </div>
      </div>
    ))}
    
  </div>
);

export default connect(state => state, actions)(App);
