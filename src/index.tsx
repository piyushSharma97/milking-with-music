import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

/** Mounts the React application and enables client-side routing. */
function renderApplication(): void {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('The application root element was not found.');
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Router basename={import.meta.env.BASE_URL}>
        <App />
      </Router>
    </React.StrictMode>
  );
}

renderApplication();
