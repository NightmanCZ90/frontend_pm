import { createForm, email, Field, Form, minLength, required, SubmitEvent } from "@modular-forms/solid";
import { Button, CircularProgress, TextField, Typography } from "@suid/material";
import { Component, createResource, createSignal, For, Setter } from "solid-js";
import { useDispatch } from "../../store";
import { tokens, useThemeContext } from "../../styles/theme";
import { remapFieldProps } from "../../utils/helpers";
import { StyledSignUp, StyledSignUpForm } from "./SignUp.styles";

async function signUp(payload: RegisterForm) {
  const dispatch = useDispatch();

  return dispatch.auth.signUp({ email: payload.email, password: payload.password, confirmPassword: payload.confirmPassword });
}

export type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ISignUpProps {
  setShowLogin: Setter<boolean>;
}

const SignUp: Component<ISignUpProps> = (props) => {
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());

  const registerForm = createForm<RegisterForm>({ validateOn: "touched" });
  const [formData, setFormData] = createSignal<RegisterForm | null>(null);

  const [registration] = createResource(formData, signUp);

  const handleSubmit = (values: RegisterForm, event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setFormData(values);
  }

  return (
    <StyledSignUp class="SignUp">

      <StyledSignUpForm colors={colors()}>
        <Typography variant="h1" fontWeight={500}>port/fall.io</Typography>
        <br />
        <Form of={registerForm} onSubmit={handleSubmit}>

          <Field
            of={registerForm}
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
              />}
          </Field>

          <Field
            of={registerForm}
            name="password"
            validate={[
              required('Please enter your password.'),
              minLength(8, 'Your password must have 8 characters or more.')
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
          <Field
            of={registerForm}
            name="confirmPassword"
            validate={[
              required('Please enter your password.'),
              minLength(8, 'Your password must have 8 characters or more.')
            ]}
          >
            {(field) =>
              <TextField
                inputProps={{ ...remapFieldProps(field.props) }}
                type="password"
                color="secondary"
                variant="outlined"
                label="Confirm password"
                required
                error={Boolean(field.error)}
                helperText={field.error}
              />}
          </Field>

          {registration.error && registration.error.message
            ? Array.isArray(registration.error.message)
              ? <For each={registration.error.message}>
                {(item) => <span class="error-message">{item}</span>}
              </For>
              : <span class="error-message">{registration.error?.message}</span>
            : null}

          <div class="signup-form-buttons">
            <Button color="secondary" onClick={() => props.setShowLogin(true)}>Already have an account?</Button>

            <Button
              type="submit"
              color="secondary"
              variant="contained"
              disabled={registration.loading || registerForm.invalid}
            >
              {registration.loading ? (<CircularProgress size={24} />) : "Sign up"}
            </Button>
          </div>

        </Form>
      </StyledSignUpForm>

    </StyledSignUp>
  )
}

export default SignUp;