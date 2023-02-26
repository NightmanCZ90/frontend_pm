import type { Component } from 'solid-js';
import { Route, Routes } from '@solidjs/router';

import { StyledApp } from './App.styles';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Portfolios from './pages/Portfolios';

const App: Component = () => {

  return (
    <StyledApp>
      <Sidebar />
      <Routes>
        <Route path={'/'} element={<Dashboard />} />
        <Route path={'/portfolios'} element={<Portfolios />} />
      </Routes>
    </StyledApp>
  );
};

export default App;
