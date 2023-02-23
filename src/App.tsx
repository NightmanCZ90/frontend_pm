import type { Component } from 'solid-js';
import { Route, Routes } from '@solidjs/router';

import { StyledApp } from './App.styles';
import SideNavigation from './components/SideNavigation';
import Home from './pages/Home';
import Portfolios from './pages/Portfolios';

const App: Component = () => {

  return (
    <StyledApp>
      <SideNavigation />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/portfolios'} element={<Portfolios />} />
      </Routes>
    </StyledApp>
  );
};

export default App;
