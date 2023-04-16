import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartContextProvider } from './contexts/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <CartContextProvider>
      <App />
    </CartContextProvider>
    
  </React.Fragment>
);

reportWebVitals();
