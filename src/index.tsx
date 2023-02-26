/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { ThemeProvider } from '@suid/material';

import './index.css';
import App from './App';
import { CustomThemeProvider } from './styles/theme';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

render(() => (
  <CustomThemeProvider>
    <Router>
      <App />
    </Router>
  </CustomThemeProvider>
), root!);
