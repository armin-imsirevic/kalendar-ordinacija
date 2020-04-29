import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './App.css';
import { ConnectedComponent } from './component/Component';
import { reducer } from './state/reducer';

let store = createStore(reducer as any);

const App = () => (
  <Provider store={store}>
    <ConnectedComponent />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
