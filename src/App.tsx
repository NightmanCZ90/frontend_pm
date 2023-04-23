import { Component, createSignal, Show } from 'solid-js';
import { Route, Routes } from '@solidjs/router';

import { StyledApp } from './App.styles';
import Sidebar from './pages/globals/Sidebar';
import Dashboard from './pages/Dashboard';
import Portfolios from './pages/Portfolios';
import Topbar from './pages/globals/Topbar';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import useBootstrap from './hooks/useBootstrap';
import UserAccount from './pages/UserAccount';
import PortfolioDetail from './pages/PortfolioDetail';
import CreatePortfolio from './pages/CreatePortfolio';
import EditPortfolio from './pages/EditPortfolio';
import { authStore } from './stores/AuthStore';

// TODO: Add Internationalization and Localization
// export const formatter = new Intl.NumberFormat('en-US');
export const formatterWithCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const App: Component = () => {
  useAxiosPrivate();
  useBootstrap();

  const [showLogin, setShowLogin] = createSignal(true);

  const tokens = localStorage.getItem('jwt_token');
  authStore.setAuth('tokens', tokens ? JSON.parse(tokens) : null);

  // Show either signin page or signup page
  const renderFallback = () => showLogin()
    ? <SignIn setShowLogin={setShowLogin} />
    : <SignUp setShowLogin={setShowLogin} />

  return (
    <StyledApp>

      <Show when={authStore.auth.tokens} fallback={renderFallback()}>
        <Sidebar />
        <main>
          <Topbar />
          <div class='content'>
            <Routes>
              <Route path={'/'} element={<Dashboard />} />

              <Route path={'/portfolios'}>
                <Route path={'/'} element={<Portfolios />} />
                <Route path={'/create'} element={<CreatePortfolio />} />
                <Route path={'/:portfolioId'}>
                  <Route path={'/'} element={<PortfolioDetail />} />
                  <Route path={'/edit'} element={<EditPortfolio />} />
                </Route>
              </Route>

              <Route path={'/user-account'} element={<UserAccount />} />
            </Routes>
          </div>
        </main>
      </Show>

    </StyledApp>
  );
};

export default App;
