import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Sagas from './store/Sagas';
import Store from './store/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
const sagas = new Sagas()

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

