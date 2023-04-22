import { createForm, email, required, SubmitEvent } from "@modular-forms/solid";
import { Button, CircularProgress, TextField, Typography } from "@suid/material";
import { Component, createResource, createSignal, Setter } from "solid-js";
import ErrorMessage from "../../components/ErrorMessage";
import { tokens, useThemeContext } from "../../styles/theme";
import { remapFieldProps } from "../../utils/helpers";
import { StyledSignIn, StyledSignInForm } from "./SignIn.styles";
import { signIn } from "../../stores/AuthStore";

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

  const [loginForm, Login] = createForm<LoginForm>({ validateOn: "touched" });
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
        <Login.Form onSubmit={handleSubmit}>

          <Login.Field
            name="email"
            type="string"
            validate={[
              required('Please enter your email.'),
              email('Please enter a valid email address.')
            ]}
          >
            {(field, props) =>
              <TextField
                inputProps={{ ...remapFieldProps(props) }}
                type="email"
                label="E-mail"
                color="secondary"
                variant="outlined"
                required
                value={field.value || ''}
                error={Boolean(field.error)}
                helperText={field.error}
              />
            }
          </Login.Field>

          <Login.Field
            name="password"
            type="string"
            validate={[
              required('Please enter your password.'),
            ]}
          >
            {(field, props) =>
              <TextField
                inputProps={{ ...remapFieldProps(props) }}
                type="password"
                label="Password"
                color="secondary"
                variant="outlined"
                required
                value={field.value || ''}
                error={Boolean(field.error)}
                helperText={field.error}
              />}
          </Login.Field>

          <div class="signin-form-button">
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

          <ErrorMessage resource={authentication} />

          <div class="signin-form-buttons">
            <Button color="secondary" onClick={() => props.setShowLogin(false)}>Create new account</Button>

            {/* For testing purposes - faster signin */}
            <button type="button" onClick={() => setFormData({ email: 'test@test.com', password: 'heslo' })}>Sign in as Test</button>
          </div>

        </Login.Form>
      </StyledSignInForm>

    </StyledSignIn>
  )
}

export default SignIn;