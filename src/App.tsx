import type { Component } from 'solid-js';
import { Route, Routes } from '@solidjs/router';

import { StyledApp } from './App.styles';
import Sidebar from './components/Sidebar';
import Home from './pages/Dashboard';
import Portfolios from './pages/Portfolios';

const App: Component = () => {

  return (
    <StyledApp>
      <Sidebar />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/portfolios'} element={<Portfolios />} />
      </Routes>
    </StyledApp>
  );
};

export default App;
