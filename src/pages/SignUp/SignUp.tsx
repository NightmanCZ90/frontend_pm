import { createForm, email, getValue, minLength, required, SubmitEvent, value } from "@modular-forms/solid";
import { Button, CircularProgress, TextField, Typography } from "@suid/material";
import { Component, createResource, createSignal, Setter } from "solid-js";
import ErrorMessage from "../../components/ErrorMessage";
import { tokens, useThemeContext } from "../../styles/theme";
import { remapFieldProps } from "../../utils/helpers";
import { StyledSignUp, StyledSignUpForm } from "./SignUp.styles";
import { signUp } from "../../stores/AuthStore";

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

  const [registerForm, Form] = createForm<RegisterForm>({ validateOn: "touched" });
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
        <Form.Form onSubmit={handleSubmit}>

          <Form.Field
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
                size="small"
                required
                value={field.value || ''}
                error={Boolean(field.error)}
                helperText={field.error}
              />}
          </Form.Field>

          <Form.Field
            name="password"
            type="string"
            validate={[
              required('Please enter your password.'),
              minLength(8, 'Your password must have 8 characters or more.')
            ]}
          >
            {(field, props) =>
              <TextField
                inputProps={{ ...remapFieldProps(props) }}
                type="password"
                label="Password"
                color="secondary"
                variant="outlined"
                size="small"
                required
                value={field.value || ''}
                error={Boolean(field.error)}
                helperText={field.error}
              />}
          </Form.Field>
          <Form.Field
            name="confirmPassword"
            type="string"
            validate={[
              required('Please enter your password.'),
              value(getValue(registerForm, 'password') || '', 'Passwords must match.')
            ]}
          >
            {(field, props) =>
              <TextField
                inputProps={{ ...remapFieldProps(props) }}
                type="password"
                label="Confirm password"
                color="secondary"
                variant="outlined"
                size="small"
                required
                value={field.value || ''}
                error={Boolean(field.error)}
                helperText={field.error}
              />}
          </Form.Field>

          <ErrorMessage resource={registration} />

          <div class="signup-form-buttons">
            <Button color="secondary" size="small" onClick={() => props.setShowLogin(true)}>Already have an account?</Button>

            <Button
              type="submit"
              color="secondary"
              variant="contained"
              size="small"
              disabled={registration.loading || registerForm.invalid}
            >
              {registration.loading ? (<CircularProgress size={24} />) : "Sign up"}
            </Button>
          </div>

        </Form.Form>
      </StyledSignUpForm>

    </StyledSignUp>
  )
}

export default SignUp;