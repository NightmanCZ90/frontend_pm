import { Component } from 'solid-js';
import { Route, Routes } from '@solidjs/router';

import { StyledApp } from './App.styles';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Portfolios from './pages/Portfolios';
import Topbar from './pages/globals/Topbar';

const App: Component = () => {

  return (
    <StyledApp>
      <Sidebar />
      <div class='content'>
        <Topbar />
        <Routes>
          <Route path={'/'} element={<Dashboard />} />
          <Route path={'/portfolios'} element={<Portfolios />} />
        </Routes>
      </div>
    </StyledApp>
  );
};

export default App;
