import { createForm, Field, Form, setValue } from "@modular-forms/solid";
import { Button, CircularProgress, TextField } from "@suid/material";
import { Component, createEffect, createResource, createSignal, For } from "solid-js";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "../../store";
import { tokens, useThemeContext } from "../../styles/theme";
import { remapFieldProps } from "../../utils/helpers";
import { StyledUserAccount, StyledUserAccountContent } from './UserAccount.styles';

async function updateCurrentUser(payload: UserAccountForm) {
  const dispatch = useDispatch();

  return dispatch.auth.updateCurrentUser(payload);
}

export type UserAccountForm = {
  firstName: string;
  lastName: string;
}

interface IUserAccountProps {

}

const UserAccount: Component<IUserAccountProps> = (props) => {
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());
  const { auth } = useSelector();

  const userAccountForm = createForm<UserAccountForm>({ validateOn: "touched" });
  const [formData, setFormData] = createSignal<UserAccountForm | null>(null);

  const [updatedCurrentUser] = createResource(formData, updateCurrentUser);

  createEffect(() => {
    setValue(userAccountForm, 'firstName', auth.currentUser?.firstName || '');
    setValue(userAccountForm, 'lastName', auth.currentUser?.lastName || '');
  })

  const userTitle = () => auth.currentUser?.email || 'User Account';

  const handleSubmit = (values: UserAccountForm, event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setFormData(values);
  }

  return (
    <StyledUserAccount class="UserAccount">
      <div class="header-content">
        <Header title={userTitle} subtitle="Manage your account here" />
      </div>

      <StyledUserAccountContent class="UserAccountContent">
        <Form of={userAccountForm} onSubmit={handleSubmit}>
          <Field
            of={userAccountForm}
            name="firstName"
            validate={[

            ]}
          >
            {(field) =>
              <TextField
                inputProps={{ ...remapFieldProps(field.props) }}
                label="First name"
                color="secondary"
                sx={{ backgroundColor: colors().primary[400] }}
                value={field.value || ''}
                error={Boolean(field.error)}
                helperText={field.error}
              />
            }
          </Field>

          <Field
            of={userAccountForm}
            name="lastName"
            validate={[

            ]}
          >
            {(field) =>
              <TextField
                inputProps={{ ...remapFieldProps(field.props) }}
                label="Last name"
                color="secondary"
                sx={{ backgroundColor: colors().primary[400] }}
                value={field.value || ''}
                error={Boolean(field.error)}
                helperText={field.error}
              />
            }
          </Field>
          <div class="signup-form-buttons">
            <Button
              color="secondary"
              type="submit"
              variant="contained"
              disabled={updatedCurrentUser.loading || userAccountForm.invalid}
            >
              {updatedCurrentUser.loading ? (<CircularProgress size={24} />) : "Save"}
            </Button>
          </div>
          {updatedCurrentUser.error && updatedCurrentUser.error.message
            ? Array.isArray(updatedCurrentUser.error.message)
              ? <For each={updatedCurrentUser.error.message}>
                {(item) => <span class="error-message">{item}</span>}
              </For>
              : <span class="error-message">{updatedCurrentUser.error?.message}</span>
            : null}
        </Form>
      </StyledUserAccountContent>
    </StyledUserAccount>
  )
}

export default UserAccount;