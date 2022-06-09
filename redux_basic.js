// Write applyMiddleware here
const applyMiddleWare = (middleWares) => {

}

// Write loggingMiddleWare here
const loggingMiddleware = (store) => (next) => (action) => {
  console.log(action.type);
  next(action);
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

function createStore(reducer, state) {
  let subscribers = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(getState(), action);
    subscribers.forEach(cb => cb());
  }

  function subscribe(cb) {
    subscribers.push(cb);
  }

  return {
    dispatch,
    subscribe,
    getState
  };
}


let store = createStore(counter, initialState, applyMiddleWare([loggingMiddleware]));
console.log('Initial State : ', store.getState());

console.log('Subscribing two functions 1111 and 2222 which will be called after each dispatch');
store.subscribe(() => console.log(store.getState(), '1111'));
store.subscribe(() => console.log(store.getState(), '2222'));

console.log('Dispatching type: INCREMENT');
store.dispatch({ type: 'INCREMENT' });
// 1
console.log('Dispatching type: INCREMENT');
store.dispatch({ type: 'INCREMENT' });
// 2
console.log('Dispatching type: DECREMENT');
store.dispatch({ type: 'DECREMENT' });
// 1
