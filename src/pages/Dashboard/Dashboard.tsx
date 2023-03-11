import { Component, Show } from "solid-js";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "../../store";
import { StyledDashboard } from "./Dashboard.styles";

const Dashboard: Component = () => {
  const { auth } = useSelector();
  const { auth: { setLogin, setCurrentUser } } = useDispatch();

  return (
    <StyledDashboard class="Dashboard">
      <div class="header-content">
        <Header title="Dashboard" subtitle="Welcome to you dashboard" />
      </div>
      <Show
        when={auth.login}
        fallback={(
          <button onClick={() => setLogin(true)}>Sign in</button>
        )}
      >
        <button onClick={() => setLogin(false)}>Sign out</button>
      </Show>

      <input onInput={(e) => setCurrentUser(e.currentTarget.value)} />
    </StyledDashboard>
  )
}

export default Dashboard;