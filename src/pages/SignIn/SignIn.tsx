import { Component, createEffect, createResource, createSignal, Setter } from "solid-js";
import { useDispatch } from "../../store";

async function signIn() {
  const dispatch = useDispatch();
  const tokens = await dispatch.auth.signIn({ email: 'test@test.com', password: 'heslo' });

  return tokens;
}

interface ISignInProps {
  setShowLogin: Setter<boolean>;
}

const SignIn: Component<ISignInProps> = (props) => {
  const [trigger, setTrigger] = createSignal(false)
  const [tokens] = createResource(trigger, signIn);

  createEffect(() => {
    console.log(tokens.loading);
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