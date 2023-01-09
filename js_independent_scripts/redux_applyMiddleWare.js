// https://codeburst.io/build-your-own-redux-from-scratch-1fb1c348b2f8

// https://medium.com/fullstack-academy/thunks-in-redux-the-basics-85e538a3fe60

// https://medium.com/@stansarr/create-your-own-redux-middleware-49bf226546e1

import { createStore, applyMiddleware } from 'redux';

// Write your own custom applyMiddleware here
const applyCustomMiddleWare = (middleWares) => {
  middleWares.forEach(middleWare => middleWare()()());
  // middleWares.forEach(middleWare => middleWare(this)(this.dispatch)({type: 'INCREMENT'}));
}

const testMiddleWare = store => next => action => {
  console.log('Test middleware called');
};

// Write custom loggingMiddleWare here
const loggingMiddleWare = ({ getState }) => next => action => {
  console.log('will dispatch', action);

  // Call the next dispatch method in the middleware chain.
  const returnValue = next(action);

  console.log('state after dispatch', getState());

  // This will likely be the action itself, unless
  // a middleware further in chain changed it.
  return returnValue;
};


// Redux store basic
let initialState = 0;

function counter(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

let store = createStore(counter, initialState, applyMiddleware(loggingMiddleWare, testMiddleWare));
// let store = createCustomStore(counter, initialState, applyMiddleware([testMiddleWare, loggingMiddleWare]));
console.log('Initial State : ', store.getState());

console.log('Subscribing two functions 1111 and 2222 which will be called after each dispatch');
store.subscribe(() => console.log(store.getState(), '1111'));
store.subscribe(() => console.log(store.getState(), '2222'));

store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1
