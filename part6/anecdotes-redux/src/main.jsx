import ReactDOM from 'react-dom/client';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import App from './App.jsx';

import anecdotesReducer from './reducers/anecdotesReducer.js';
import filterReducer from './reducers/filterReducer.js';

const rootReducer = combineReducers({
  anecdotes: anecdotesReducer,
  filter: filterReducer,
});

const store = createStore(rootReducer);

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
