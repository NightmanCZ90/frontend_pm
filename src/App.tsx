import type { Component } from 'solid-js';
import { Button } from '@suid/material';
import { styled } from 'solid-styled-components';

const StyledApp = styled("div")`

`;

const App: Component = () => {
  return (
    <StyledApp>
      <h1>Portfolio manager</h1>
      <Button variant='contained'>Join us!</Button>
    </StyledApp>
  );
};

export default App;
