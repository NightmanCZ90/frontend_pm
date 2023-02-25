import { Component } from 'solid-js';
import { Button, Paper } from '@suid/material';

import { StyledApp } from './App.styles';
import { useTheme } from './styles/theme';

const App: Component = () => {
  const [mode, toggleColorMode] = useTheme();

  return (
    <StyledApp>
      <Paper>
        <h1>Portfolio manager</h1>
        <Button variant='contained' onClick={toggleColorMode}>Toggle theme</Button>
        <Button variant='contained' color='secondary' onClick={toggleColorMode}>Toggle theme</Button>
        {JSON.stringify(mode())}
      </Paper>
    </StyledApp>
  );
};

export default App;
