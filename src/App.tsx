import { Component, createSignal, Show } from 'solid-js';
import { Route, Routes } from '@solidjs/router';

import { StyledApp } from './App.styles';
import Sidebar from './pages/globals/Sidebar';
import Dashboard from './pages/Dashboard';
import Portfolios from './pages/Portfolios';
import Topbar from './pages/globals/Topbar';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import { useDispatch, useSelector } from './store';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import useBootstrap from './hooks/useBootstrap';

const App: Component = () => {
  useAxiosPrivate();
  useBootstrap();

  const { auth } = useSelector();
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = createSignal(true);

  const tokens = localStorage.getItem('jwt_token');
  dispatch.auth.setTokens(tokens ? JSON.parse(tokens) : null);

  // Show either signin page or signup page
  const renderFallback = () => showLogin()
    ? <SignIn setShowLogin={setShowLogin} />
    : <SignUp setShowLogin={setShowLogin} />

  return (
    <StyledApp>

      <Show when={auth.tokens} fallback={renderFallback}>
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
      </Show>

    </StyledApp>
  );
};

export default App;
