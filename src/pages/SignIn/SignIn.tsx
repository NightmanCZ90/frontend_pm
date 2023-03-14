import { createForm, email, Field, Form, required, SubmitEvent } from "@modular-forms/solid";
import { Button, CircularProgress, TextField, Typography } from "@suid/material";
import { Component, createResource, createSignal, For, Setter } from "solid-js";
import { useDispatch } from "../../store";
import { tokens, useThemeContext } from "../../styles/theme";
import { remapFieldProps } from "../../utils/helpers";
import { StyledSignIn, StyledSignInForm } from "./SignIn.styles";

async function signIn(payload: LoginForm) {
  const dispatch = useDispatch();

  return dispatch.auth.signIn({ email: payload.email, password: payload.password });
}

export type LoginForm = {
  email: string;
  password: string;
}

interface ISignInProps {
  setShowLogin: Setter<boolean>;
}

const SignIn: Component<ISignInProps> = (props) => {
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());

  const loginForm = createForm<LoginForm>({ validateOn: "touched" });
  const [formData, setFormData] = createSignal<LoginForm | null>(null);

  const [authentication] = createResource(formData, signIn);

  const handleSubmit = (values: LoginForm, event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setFormData(values);
  }

  return (
    <StyledSignIn class="SignIn">

      <StyledSignInForm colors={colors()}>
        <Typography variant="h1" fontWeight={500}>port/fall.io</Typography>
        <br />
        <Form of={loginForm} onSubmit={handleSubmit}>

          <Field
            of={loginForm}
            name="email"
            validate={[
              required('Please enter your email.'),
              email('Please enter a valid email address.')
            ]}
          >
            {(field) =>
              <TextField
                inputProps={{ ...remapFieldProps(field.props) }}
                type="email"
                color="secondary"
                variant="outlined"
                label="E-mail"
                required
                error={Boolean(field.error)}
                helperText={field.error}
                value={field.value || ''}
              />}
          </Field>

          <Field
            of={loginForm}
            name="password"
            validate={[
              required('Please enter your password.'),
            ]}
          >
            {(field) =>
              <TextField
                inputProps={{ ...remapFieldProps(field.props) }}
                type="password"
                color="secondary"
                variant="outlined"
                label="Password"
                required
                error={Boolean(field.error)}
                helperText={field.error}
              />}
          </Field>

          <div class="signin-form--button">
            <Button
              type="submit"
              fullWidth
              color="secondary"
              variant="contained"
              disabled={authentication.loading || loginForm.invalid}
            >
              {authentication.loading ? (<CircularProgress size={24} />) : "Sign in"}
            </Button>
          </div>

          {authentication.error && authentication.error.message
            ? Array.isArray(authentication.error.message)
              ? <For each={authentication.error.message}>
                {(item) => <span class="error-message">{item}</span>}
              </For>
              : <span class="error-message">{authentication.error?.message}</span>
            : null}

          <div class="signin-form--buttons">
            <Button color="secondary" onClick={() => props.setShowLogin(false)}>Create new account</Button>

            {/* For testing purposes - faster signin */}
            <button type="button" onClick={() => setFormData({ email: 'test@test.com', password: 'heslo' })}>Sign in as Test</button>
          </div>

        </Form>
      </StyledSignInForm>

    </StyledSignIn>
  )
}

export default SignIn;