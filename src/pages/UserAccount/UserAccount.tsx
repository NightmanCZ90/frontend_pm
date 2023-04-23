import { createForm, required, setValues, SubmitEvent } from "@modular-forms/solid";
import { Button, CircularProgress, TextField } from "@suid/material";
import { Component, createEffect, createResource, createSignal } from "solid-js";
import ErrorMessage from "../../components/ErrorMessage";
import Header from "../../components/Header";
import { tokens, useThemeContext } from "../../styles/theme";
import { remapFieldProps } from "../../utils/helpers";
import { StyledUserAccount, StyledUserAccountContent } from './UserAccount.styles';
import { authStore, updateCurrentUser } from "../../stores/AuthStore";

export type UserAccountForm = {
  firstName: string;
  lastName: string;
}

interface IUserAccountProps {

}

const UserAccount: Component<IUserAccountProps> = (props) => {
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());

  const { auth } = authStore;

  const [userAccountForm, Form] = createForm<UserAccountForm>({ validateOn: "touched" });
  const [formData, setFormData] = createSignal<UserAccountForm | null>(null);

  const [updatedCurrentUser] = createResource(formData, updateCurrentUser);

  createEffect(() => {
    setValues(userAccountForm, {
      firstName: auth.currentUser?.firstName || '',
      lastName: auth.currentUser?.lastName || '',
    });
  });

  const userTitle = () => auth.currentUser?.email || 'User Account';

  const handleSubmit = (values: UserAccountForm, event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setFormData(values);
  }

  return (
    <StyledUserAccount class="UserAccount">
      <div class="header-content">
        <Header title={userTitle()} subtitle="Manage your account here" />
      </div>

      <StyledUserAccountContent class="UserAccountContent" colors={colors()}>
        <Form.Form onSubmit={handleSubmit}>
          <Form.Field
            name="firstName"
            type="string"
            validate={[
              required('Please enter you first name.'),
            ]}
          >
            {(field, props) =>
              <TextField
                inputProps={{ ...remapFieldProps(props) }}
                label="First name"
                color="secondary"
                size="small"
                value={field.value || ''}
                error={Boolean(field.error)}
                helperText={field.error}
              />
            }
          </Form.Field>

          <Form.Field
            name="lastName"
            type="string"
            validate={[
              required('Please enter you last name.'),
            ]}
          >
            {(field, props) =>
              <TextField
                inputProps={{ ...remapFieldProps(props) }}
                label="Last name"
                color="secondary"
                size="small"
                value={field.value || ''}
                error={Boolean(field.error)}
                helperText={field.error}
              />
            }
          </Form.Field>
          <div class="signup-form-buttons">
            <Button
              color="secondary"
              type="submit"
              variant="contained"
              size="small"
              disabled={updatedCurrentUser.loading || userAccountForm.invalid}
            >
              {updatedCurrentUser.loading ? (<CircularProgress size={24} />) : "Save"}
            </Button>
          </div>

          <ErrorMessage resource={updatedCurrentUser} />

        </Form.Form>
      </StyledUserAccountContent>
    </StyledUserAccount>
  )
}

export default UserAccount;