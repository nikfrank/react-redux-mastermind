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

<sub>./src/CodeInput.test.js</sub>
```js

```





This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
