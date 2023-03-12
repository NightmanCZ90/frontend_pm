import { Component, createEffect, createResource, createSignal, Setter } from "solid-js";
import RestApiClient from "../../services/RestApiClient";
import { useDispatch } from "../../store";

async function signIn() {
  const res = await RestApiClient.signIn({ email: 'test@test.com', password: 'heslo' });
  console.log('res: ', res);
  return res;
}

interface ISignInProps {
  setShowLogin: Setter<boolean>;
}

const SignIn: Component<ISignInProps> = (props) => {
  const [trigger, setTrigger] = createSignal(false)
  const [tokens] = createResource(trigger, signIn);
  const dispatch = useDispatch();

  createEffect(() => {
    dispatch.auth.setTokens(tokens() || null)
  });

  return (
    <div>
      <h1>SignIn - Login</h1>
      <button onClick={() => setTrigger(true)}>Sign in</button>
      <button onClick={() => props.setShowLogin(false)}>Register new user</button>
    </div>
  )
}

export default SignIn;