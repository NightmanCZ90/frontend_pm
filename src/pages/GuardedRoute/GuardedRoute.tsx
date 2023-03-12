import { Route, RouteProps } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import { useSelector } from "../../store";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

interface IGuardedRouteProps {
  component: Component;
}

const GuardedRoute: Component<IGuardedRouteProps & RouteProps<string>> = ({ component: GuardedComponent, ...rest }) => {
  const { auth } = useSelector();

  const [showLogin, setShowLogin] = createSignal(false);

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