import { Route, RouteProps } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import { authStore } from "../../stores/AuthStore";

interface IGuardedRouteProps {
  component: Component;
}

const GuardedRoute: Component<IGuardedRouteProps & RouteProps<string>> = ({ component: GuardedComponent, ...rest }) => {
  const { auth } = authStore;

  const [showLogin, setShowLogin] = createSignal(false);

  // TODO: Refactor to Admin guard or customizable guard

  // Show either signin page or signup page
  const renderFallback = () => showLogin()
    ? <SignIn setShowLogin={setShowLogin} />
    : <SignUp setShowLogin={setShowLogin} />

  // Render Guarded component or fallback
  const renderGuardedComponent = (props: any) => () => auth.tokens?.accessToken
    ? <GuardedComponent {...props} />
    : renderFallback

  return <Route {...rest} component={renderGuardedComponent} />
}

export default GuardedRoute;