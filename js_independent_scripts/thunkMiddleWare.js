// https://medium.com/fullstack-academy/thunks-in-redux-the-basics-85e538a3fe60

// In sync action obj, we dispatch them directly to store
// In async, we do not know what action obj to dispatch so we delay it using thunk 
const normal = (action) => console.log('Sync : ', action);
const thunk = (action) => (dispatch, getState) => console.log('Async : ', action);
// (dispatch, getState) => console.log('Async : ', action); above is the thunk part

normal({type: 'INCREMENT'});
const thunked = thunk({type: 'INCREMENT'});

const tm = setTimeout(() => {
  thunked(); // delayed
}, 2000);

// Sample redux thunk middleWare
const thunkMiddleWare = ({getState, dispatch}) => next => action => {
  typeof action === 'function'
    ? action(dispatch, getState)
    : next(action)
};
