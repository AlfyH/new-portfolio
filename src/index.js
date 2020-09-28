import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.css';
import Main from './Main';
import MainShell from './js/containers/MainShell';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <MainShell>
      <Main />
    </MainShell>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
