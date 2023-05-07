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
import { Drawer, IconButton } from '@suid/material';
import CreateTransaction from './forms/CreateTransaction';
import { transactionsStore } from './stores/TransactionsStore';
import { tokens, useThemeContext } from './styles/theme';
import { ChevronRight } from '@suid/icons-material';

const drawerWidth = 400;

// TODO: Add Internationalization and Localization
// export const formatter = new Intl.NumberFormat('en-US');
export const formatterWithCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const App: Component = () => {
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());

  useAxiosPrivate();
  useBootstrap();

  const [showLogin, setShowLogin] = createSignal(true);

  const { transactions, setTransactions } = transactionsStore;

  const authTokens = localStorage.getItem('jwt_token');
  authStore.setAuth('tokens', authTokens ? JSON.parse(authTokens) : null);

  // Show either signin page or signup page
  const renderFallback = () => showLogin()
    ? <SignIn setShowLogin={setShowLogin} />
    : <SignUp setShowLogin={setShowLogin} />

  return (
    <StyledApp class='App'>

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

        <Drawer
          anchor={'right'}
          open={Boolean(transactions.drawerPayload)}
          variant="persistent"
          hideBackdrop
          sx={{
            display: Boolean(transactions.drawerPayload) ? 'flex' : 'none',
            width: drawerWidth,
            transition: 'all 5s',

            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              position: 'static',
              padding: '20px',
              backgroundColor: colors()?.primary[700],
              width: drawerWidth,

              '& .header': {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }
            }
          }}
        >
          <Show when={transactions.drawerPayload}>
            {(payload) =>
              <>
                <div class="header">
                  <Show when={payload().transaction} fallback={'Create transaction'}>
                    Edit transaction
                  </Show>
                  <IconButton onClick={() => setTransactions('drawerPayload', null)}>
                    <ChevronRight />
                  </IconButton>
                </div>
                <CreateTransaction
                  portfolioId={payload().portfolioId}
                  transaction={payload().transaction}
                />
              </>
            }
          </Show>
        </Drawer>
      </Show>

    </StyledApp>
  );
};

export default App;
