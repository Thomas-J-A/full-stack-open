// import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux';

import Button from './components/UI/Button/Button';
import counterReducer from './reducers/counter.reducer';

const store = createStore(counterReducer);

const App = () => {
  const handle = (type) => {
    switch (type) {
      case 'good':
        store.dispatch({
          type: 'GOOD',
        });
        break;
      case 'ok':
        store.dispatch({
          type: 'OK',
        });
        break;
      case 'bad':
        store.dispatch({
          type: 'BAD',
        });
        break;
      case 'reset':
        store.dispatch({
          type: 'RESET',
        });
    }
  };

  const currentState = store.getState();

  return (
    <div>
      <Button text="Good" handleClick={() => handle('good')} />
      <Button text="OK" handleClick={() => handle('ok')} />
      <Button text="Bad" handleClick={() => handle('bad')} />
      <Button text="Reset" handleClick={() => handle('reset')} />
      <p>{`Good: ${currentState.good}`}</p>
      <p>{`OK: ${currentState.ok}`} </p>
      <p>{`Bad: ${currentState.bad}`}</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
