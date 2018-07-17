import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { loadAuthToken } from './local-storage';
import { setToken } from './actions/auth';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

// Hydrate the authToken from localStorage if it exist
const authToken = localStorage.getItem('authToken');
if (authToken) {
  const token = authToken;
  store.dispatch(setToken(token));
}

export default store;