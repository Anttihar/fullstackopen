import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <CssBaseline>
    <Router>
      <App />
    </Router>
  </CssBaseline>
);
