import { Component, Setter } from "solid-js";

interface ISignUpProps {
  setShowLogin: Setter<boolean>;
}

const SignUp: Component<ISignUpProps> = (props) => {
  return (
    <div>
      <h1>SignUp - Register</h1>
      <button onClick={() => props.setShowLogin(true)}>Already have an account?</button>
    </div>
  )
}

export default SignUp;