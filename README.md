# mastermind game with redux

a course by nik frank, based on [the board game](https://www.google.com/search?q=mastermind+game)

## agenda

our goal is to build a fully tested fully responsive fully deployed game.

we will use the following modules / technologies:

- react (create-react-app)
- redux
- css / flexbox
- jest (+ coverage)
- enzyme
- heroku

comletion of the course will establish a student's completion of React fundamentals

### steps

- we will create a react app
- we will install redux
- we will build a component for user input of a code
  - we will test it with enzyme to 100% coverage
- we will write action creators and reducers for user input
  - we will test them as units and as part of the Component
- we will write a function to compute a guess-score
  - we will test it as a unit
- we will write a component for displaying previous guesses / scores
  - we will test it with enzyme
- we will write an action creator and reducer for guessing
  - we will test the user flow for guessing
- we will test the end-game logic
  - we will implement the end-game and loop



## getting started

`$ npx create-react-app mastermind`

`$ cd mastermind`

`$ yarn add redux react-redux enzyme enzyme-adapter-react-16`

`$ npm start`


[read a bit on the redux docs](https://redux.js.org/)

[and a bit from the react-redux docs](https://react-redux.js.org/introduction/quick-start)

let's focus more on writing the code to see it run than something some dude on the internet is saying


### putting together react and the redux store

`$ touch src/store.js`


here we'll initialize a redux store using a POJO (not a switch)

<sub>./src/store.js</sub>
```js
import { createStore } from 'redux';

export const reducers = {
  
};

export const identity = i => i;


export const reducer = (state, action)=> (
  reducers[action.type] || identity
)(state, action);


export default createStore(reducer);
```


and here we'll use the off the shelf `react-redux` configuration


<sub>./src/index.js</sub>
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```


now let's initialize our state and connect our `App` to the store

<sub>./src/store.js</sub>
```js
import { createStore } from 'redux';


export const initState = {
  code: [1, 2, 3, 4],
};


export const reducers = {
  
};

export const identity = i => i;


export const reducer = (state = initState, action)=> (
  reducers[action.type] || identity
)(state, action);


export default createStore(reducer);
```


<sub>./src/App.js</sub>
```js
import React from 'react';
import './App.css';

import { connect } from 'react-redux';

const App = ({ code })=> (
  <div className="App">
    {code}
  </div>
);

export default connect(state => state)(App);
```


when running the webpack dev server (`$ yarn start`) we should now see our code `1234` rendered


### testing our setup

now that our state and our Component are separate, we can test them separately

`$ touch src/store.test.js`


at first we'll just test that the initialization is done correctly


<sub>./src/store.test.js</sub>
```js
import store from './store';

it('has an initial state', ()=>{
  const initState = store.getState();

  expect(typeof initState).toEqual('object');
});
```


in both cases

<sub>./src/App.test.js</sub>
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
```

### enzyme config

`$ touch src/enzyme-config.js`

<sub>./src/enzyme-config.js</sub>
```js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

we'll remember to import this file when we use enzyme


## the user input component


`$ touch src/CodeInput.js src/CodeInput.test.js`

<sub>./src/CodeInput.test.js</sub>
```js
import React from 'react';

import './enzyme-config';
import { mount } from 'enzyme';

import CodeInput from './CodeInput';


it('renders the CodeInput', ()=>{
  const p = mount(<CodeInput />);

  expect(p.html()).toMatch(/div/);
});
```

<sub>./src/CodeInput.js</sub>
```js
import React from 'react';

const CodeInput = ()=> (
  <div/>
);

export default CodeInput;
```


now we're ready to TDD this component into existence!


### what does this thing do again?

our `CodeInput` will need to display the current code value, and provide buttons for altering the code


#### check for code dots

<sub>./src/CodeInput.test.js</sub>
```js

it('renders the CodeInput\'s 4 digit code', ()=>{
  const p = mount(<CodeInput />);

  expect(p.html()).toMatch(/(div class=.*){4}/);
});
```

making sure that they have at least a `className` to be styled by, and that there's four of them


#### `map` out the code dots

<sub>./src/CodeInput.js</sub>
```js
import React from 'react';

const CodeInput = ({ code=[1,2,3,4], onChange })=> (
  code.map((dot, i) => (<div className={'dot-'+dot} key={i} />))
);

export default CodeInput;
```

here we'll use the different classNames we're generating to style different numbers in the code as different colors.


#### check for up and dn buttons

make sure there's eight buttons

<sub>./src/CodeInput.test.js</sub>
```js
it('renders the CodeInput\'s 4 digit up & dn buttons', ()=>{
  const p = mount(<CodeInput />);

  const buttons = p.find('button');

  expect(buttons).toHaveLength(8);

  //...
});
```

now let's make the buttons

<sub>./src/CodeInput.js</sub>
```js
import React from 'react';

const CodeInput = ({ code=[1,2,3,4], onChange })=> (
  code.map((dot, i) => (
    <div className={'dot-'+dot} key={i}>
      <button>up</button>
      <button>dn</button>
    </div>
  ))
);

export default CodeInput;
```

####

click the buttons and expect `onChange` calls

<sub>./src/CodeInput.test.js</sub>
```js
it('renders the CodeInput\'s 4 digit up & dn buttons', ()=>{
  const onChange = jest.fn();
  
  const p = mount(<CodeInput code={[1, 2, 3, 4]} onChange={onChange}/>);

  const buttons = p.find('button');

  expect(buttons).toHaveLength(8);

  expect(p.find('.up0')).toHaveLength(1);
  buttons.find('.up0').at(0).simulate('click');

  expect( onChange.mock.calls ).toHaveLength( 1 );
  expect( onChange.mock.calls[0][0] ).toEqual([3, 3, 4, 5]);
});
```

here we need to expect the input to the onChange function to be the next copy of the code we want to put into our `state`

we've also made an assumption about the `className` we will have on each `<button/>`

it's important that now we not rely on the default param we programmed earlier onto the component's input props... that's not a feature we really wanna test



#### onChange buttons

each button will need to calculate the entire next new code

<sub>./src/CodeInput.js</sub>
```js
//...

      <button className={'up'+i} onClick={()=> onChange(
          code.map((digit, index)=> index !== i ? digit : digit + 1)
        )}>
        up
      </button>

//...
```

similarly for the dn button

<sub>./src/CodeInput.test.js</sub>
```js
//...

  expect(p.find('.dn0')).toHaveLength(1);
  p.find('.dn0').at(0).simulate('click');
  
  expect( onChange.mock.calls ).toHaveLength( 2 );
  expect( onChange.mock.calls[1][0] ).toEqual([0, 2, 3, 4]);

//...
```

<sub>./src/CodeInput.js</sub>
```js
      <button className={'dn'+i} onClick={()=> onChange(
          code.map((digit, index)=> index !== i ? digit : digit - 1)
        )}>
        dn
      </button>
```



#### test cases

we can test each of the buttons of course


<sub>./src/CodeInput.test.js</sub>
```js
  expect(p.find('.up1')).toHaveLength(1);
  p.find('.up1').at(0).simulate('click');
  
  expect( onChange.mock.calls ).toHaveLength( 3 );
  expect( onChange.mock.calls[2][0] ).toEqual([1, 3, 3, 4]);

  expect(p.find('.dn1')).toHaveLength(1);
  p.find('.dn1').at(0).simulate('click');
  
  expect( onChange.mock.calls ).toHaveLength( 4 );
  expect( onChange.mock.calls[3][0] ).toEqual([1, 1, 3, 4]);

```

for each of the remaining `<button>`s


#### edge cases

we have an issue: our game is meant to have 6 possible colors

so we should test the edge cases... if the digit is 0 and we go down, or if the digit is 5 and we go up


<sub>./src/CodeInput.test.js</sub>
```js
it('rolls over at the edges', ()=>{
  const onChange = jest.fn();

  const p = mount(<CodeInput code={[0, 0, 5, 5]} onChange={onChange}/>);

  p.find('.dn0').at(0).simulate('click');

  expect( onChange.mock.calls ).toHaveLength( 1 );
  expect( onChange.mock.calls[0][0] ).toEqual([ 5, 0, 5, 5 ]);

  
  p.find('.up3').at(0).simulate('click');

  expect( onChange.mock.calls ).toHaveLength( 2 );
  expect( onChange.mock.calls[1][0] ).toEqual([ 0, 0, 5, 0 ]);
});
```


#### edge case fix

<sub>./src/CodeInput.js</sub>
```js
import React from 'react';

const CodeInput = ({ code=[1,2,3,4], onChange, colors })=> (
  code.map((dot, i) => (
    <div className={'dot-'+dot} key={i}>
      <button className={'up'+i} onClick={()=> onChange(
          code.map((digit, index)=> index !== i ? digit : (digit + 1) % colors)
        )}>
        up
      </button>
      <button className={'dn'+i} onClick={()=> onChange(
          code.map((digit, index)=> index !== i ? digit : (digit - 1 + colors) % colors )
        )}>
        dn
      </button>
    </div>
  ))
);

export default CodeInput;
```

here I've invented a new prop for the number of colors in our game `colors`

which we need in our test


<sub>./src/CodeInput.test.js</sub>
```js
//...

  const p = mount(<CodeInput code={[1, 2, 3, 4]} onChange={onChange} colors={6}/>);

//...

  const p = mount(<CodeInput code={[0, 0, 5, 5]} onChange={onChange} colors={6}/>);
```


### coverage

let's see what our testing coverage looks like

`$ yarn test --coverage --watchAll=false`


pretty pretty good.




## connecting the user input component to `App`, `redux`


now that we have the user input component, we can write an action creator and reducer for it

<sub>./src/store.js</sub>
```js
//...

export const actions = {
  setCode: code => ({ type: 'setCode', payload: code }),
};

//...
```


<sub>./src/App.js</sub>
```js
import React from 'react';
import './App.css';

import { connect } from 'react-redux';

import { actions } from './store';

import CodeInput from './CodeInput';


export const App = ({ code })=> (
  <div className="App">
    <CodeInput code={code} onChange={(nextCode)=> console.log(nextCode)} colors={6}/>
  </div>
);

export default connect(state => state, actions)(App);
```


now our `App` will receive a prop `setCode` which we can bind to the `onChange`

<sub>./src/App.js</sub>
```js
import React from 'react';
import './App.css';

import { connect } from 'react-redux';

import { actions } from './store';

import CodeInput from './CodeInput';


export const App = ({ code, setCode })=> (
  <div className="App">
    <CodeInput code={code} onChange={setCode} colors={6}/>
  </div>
);

export default connect(state => state, actions)(App);
```

which we now need a reducer for to mutate the `state`


<sub>./src/store.js</sub>
```js
//...

export const reducers = {
  setCode: (state, action)=> ({ ...state, code: action.payload }),
};

//...
```



### testing the `App` flow

we'll now check that the userflow works in its entirety by testing the top level Component (`App`)


<sub>./src/App.test.js</sub>
```js
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
```


now we can conduct a series of actions and expect the userflow to be maintained over them

```js
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
});
```

we can also make sure to test our edge cases

```js
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

```




### testing the store on its own

we can also unit test our state logic completely separately from the view logic.

<sub>./src/store.test.js</sub>
```js
import store, { actions } from './store';

it('has an initial state, can set code', ()=>{
  const initState = store.getState();

  expect(typeof initState).toEqual('object');

  expect(Array.isArray(initState.code)).toEqual(true);

  const nextCode = [ 4, 1, 3, 0 ];
  const setCodeAction = actions.setCode( nextCode );

  store.dispatch( setCodeAction );

  const state = store.getState();

  expect( state.code ).toEqual( nextCode );
});
```

and the reducers

```js
import store, { actions, reducers } from './store';

//...

it('reduces the next code into the state', ()=>{
  const nextCode = [5, 5, 3, 0];
  const setNextCodeAction = actions.setCode(nextCode);

  const initState = { code: [1, 2, 3, 4] };
  const nextState = reducers.setCode(initState, setNextCodeAction);

  expect( nextState.code ).toEqual( nextCode );
});
```



### styling the dots

we'll need the user to be able to see the code he's entering


first we'll wrap our inputs with a flex container (from the parent `App` Component)

<sub>./src/App.js</sub>
```html
export const App = ({ code, setCode })=> (
  <div className="App">
    <div className='guess-container'>
      <CodeInput code={code} onChange={setCode} colors={6}/>
    </div>
  </div>
);
```

so now we can style them to appear correctly


<sub>./src/App.css</sub>
```css
.guess-container {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  display: flex;
  justify-content: space-around;
}

[class^=dot] {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  
  width: 50px;
  height: 150px;

  position: relative;
}

[class^=dot]::after {
  content: "";
  position: absolute;

  height: 40px;
  width: 40px;
  border-radius: 50%;

  top: calc(50% - 20px);
  left: calc(50% - 20px);
}

.dot-0::after { background-color: red; }
.dot-1::after { background-color: darkorange; }
.dot-2::after { background-color: gold; }
.dot-3::after { background-color: green; }
.dot-4::after { background-color: blue; }
.dot-5::after { background-color: cyan; }
```

we may take the time to make a separate file for CSS for the CodeInput component, however, as this workshop is focused on the state management, I'll focus less on the styling.



### coverage

let's run `$ yarn test --coverage --watchAll=false` and see where we're at again


I'm finding it a bit annoying that jest is collecting coverage from files I don't care to test (index.js, serviceWorker.js, enzyme-config.js)


so I'll add the following to my `<sub>./package.json</sub> to clean that up

```js
//...
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.js",
      "!src/index.js",
      "!src/enzyme-config.js",
      "!src/serviceWorker.js"
    ]
  }
}
```

now that coverage is 100% like it should be.



## gameplay

the user will need a button to make a guess

which will add the current code to the state.guesses

and it will compute the score for the guess by the secretCode

which will be added to the end of state.scores

the guesses and scores are to be rendered in order next to one another



### scoring a guess

`$ touch src/score.js src/score.test.js`

<sub>./src/score.js</sub>
```js
export default ()=> 0;
```

let's unit test the scoring function

we'll do that by first writing some test cases

<sub>./src/score.test.js</sub>
```js
import score from './score';

it('scores the guess', ()=> {
  const secret = [1, 2, 3, 4];

  const guesses = [
    [4, 3, 2, 1],
    [5, 5, 5, 5],
    [2, 2, 2, 2],
    [2, 2, 2, 3],
    [1, 2, 3, 3],
    [1, 2, 3, 4],
  ];

  const scores = [
    [0, 4],
    [0, 0],
    [1, 0],
    [1, 1],
    [3, 0],
    [4, 0],
  ];

  const output = guesses.map(score(secret));

  output.forEach((o, i)=> expect( o ).toEqual( scores[i] ) )
});
```


#### currying

let's write a curried function for getting the score

<sub>./src/score.js</sub>
```js
export default secret => guess => {
  
};
```

now we get back a reasonable error as our tests fail



and now we can write a logic for the scoring


```
for every digit which is eactly the same, add one to the first score number (black dots)

from the digits remaining, find the number of colors that matched in the wrong position
  - for each digit which was matched this way, add one to the second score number (white)
```

first let's count the exact matches


<sub>./src/score.js</sub>
```js
export default secret => guess => {
  const blacks = guess.filter((g, i)=> g === secret[i]).length;

```


then we'll compute the remaining digits


<sub>./src/score.js</sub>
```js
  const remainderGuess = guess.filter((g, i)=> g !== secret[i]);
  const remainderSecret = secret.filter((s, i)=> s !== guess[i]);
  
```

then we'll count how many of each digit we have left

<sub>./src/score.js</sub>
```js
  const guessBins = [0, 1, 2, 3, 4, 5]
    .map(i=> remainderGuess.filter(g => g === i).length);
  
  const secretBins = [0, 1, 2, 3, 4, 5]
    .map(i=> remainderSecret.filter(s => s === i).length);

```

then we'll add up all the matches

<sub>./src/score.js</sub>
```js
  const whites = guessBins.reduce((total, g, i)=> total + Math.min(g, secretBins[i]), 0);

  return [blacks, whites];
};

```


#### edge cases

let's make sure we add some more test cases to cover scenarios where the secret code has duplicates in it


<sub>./src/score.test.js</sub>
```js
it('scores the guess with duplicates in the secret', ()=> {
  const secret = [2, 2, 3, 3];

  const guesses = [
    [4, 3, 2, 1],
    [5, 5, 5, 5],
    [2, 2, 2, 2],
    [2, 2, 2, 3],
    [1, 3, 2, 3],
    [2, 2, 3, 3],
  ];

  const scores = [
    [0, 2],
    [0, 0],
    [2, 0],
    [3, 0],
    [1, 2],
    [4, 0],
  ];

  const output = guesses.map(score(secret));

  output.forEach((o, i)=> expect( o ).toEqual( scores[i] ) )
});
```


### guess button

#### test (enzyme) to click guess button

here we'll expect the guess and score to be saved to the state

and the guess to be rendered along with its score




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
