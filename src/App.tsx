import { Component } from 'solid-js';
import { Route, Routes } from '@solidjs/router';

import { StyledApp } from './App.styles';
import Sidebar from './pages/globals/Sidebar';
import Dashboard from './pages/Dashboard';
import Portfolios from './pages/Portfolios';
import Topbar from './pages/globals/Topbar';

const App: Component = () => {

  return (
    <StyledApp>
      <Sidebar />
      <main>
        <Topbar />
        <div class='content'>
          <Routes>
            <Route path={'/'} element={<Dashboard />} />
            <Route path={'/portfolios'} element={<Portfolios />} />
          </Routes>
        </div>
      </main>
    </StyledApp>
  );
};

export default App;
