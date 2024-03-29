import { createForm, email, maxLength, required, reset, setValues, SubmitEvent } from "@modular-forms/solid";
import { A, useNavigate, useParams } from "@solidjs/router";
import { ChevronLeft } from "@suid/icons-material";
import { Button, CircularProgress, IconButton, TextField } from "@suid/material";
import { Component, createEffect, createResource, createSignal, Match, Show, Switch } from "solid-js";
import ErrorMessage from "../../components/ErrorMessage";
import Header from "../../components/Header";
import SuccessMessage from "../../components/SuccessMessage";
import RestApiClient from "../../services/RestApiClient";
import { tokens, useThemeContext } from "../../styles/theme";
import { PortfolioOwnership } from "../../types";
import { generatePortfolioOwnership, generateUserName, remapFieldProps } from "../../utils/helpers";
import { StyledEditPortfolio } from "./EditPortfolio.styles";
import { authStore } from "../../stores/AuthStore";

const getPortfolio = async (id: string) => {
  return RestApiClient.getPortfolio(id);
}

const linkPortfolio = async (id: string, payload: InvestorEmailForm) => {
  return RestApiClient.linkPortfolio(id, payload);
}

const unlinkPortfolio = async (id: string) => {
  return RestApiClient.unlinkPortfolio(id);
}

const updatePortfolio = async (id: string, portfolio: EditPortfolioForm) => {
  return RestApiClient.updatePortfolio(id, portfolio);
}

const deletePortfolio = async (id: string) => {
  return await RestApiClient.deletePortfolio(id);
}

type InvestorEmailForm = {
  email: string;
}

type EditPortfolioForm = {
  investorId: number | null;
  name: string,
  description: string,
  color: string,
  url: string,
}

const initialEditPortfolioForm: EditPortfolioForm = {
  investorId: null,
  name: '',
  description: '',
  color: 'FFFFFF',
  url: '',
}

interface IEditPortfolioProps {
}

const EditPortfolio: Component<IEditPortfolioProps> = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());

  const { auth } = authStore;

  const [portfolio, { mutate }] = createResource(params.id, getPortfolio);

  const [investorEmailForm, InvestorEmail] = createForm<InvestorEmailForm>({ validateOn: "touched" });

  const [linkInvestorEmail, setLinkInvestorEmail] = createSignal<InvestorEmailForm | null>(null);
  const [linkedPortfolio, { mutate: mutateLink }] = createResource(linkInvestorEmail, (payload) => linkPortfolio(params.id, payload));

  const [unlinkPortfolioId, setUnlinkPortfolioId] = createSignal<string | null>(null);
  const [unlinkedPortfolio, { mutate: mutateUnlink }] = createResource(unlinkPortfolioId, unlinkPortfolio);

  const [editPortfolioForm, EditPortfolio] = createForm<EditPortfolioForm>({ validateOn: "touched", initialValues: initialEditPortfolioForm });

  const [formData, setFormData] = createSignal<EditPortfolioForm | null>(null);
  const [updatedPortfolio] = createResource(formData, (formData) => updatePortfolio(params.id, formData));

  const [deleteConfirmVisible, setDeleteConfirmVisible] = createSignal<boolean>(false);
  const [deletePortfolioId, setDeletePortfolioId] = createSignal<string | null>(null);

  const [deletedPortfolio] = createResource(deletePortfolioId, deletePortfolio);

  createEffect(() => {
    if ((!portfolio.error && portfolio())) {
      setValues(editPortfolioForm, {
        name: portfolio()?.name || '',
        description: portfolio()?.description || '',
        url: portfolio()?.url || '',
        color: portfolio()?.color || '',
      })
    }
  });

  createEffect(() => {
    if (!linkedPortfolio.error && linkedPortfolio()) {
      reset(investorEmailForm);
      mutateUnlink(undefined);
      mutate(linkedPortfolio());
    }
  });

  createEffect(() => {
    if (!unlinkedPortfolio.error && unlinkedPortfolio()) {
      setUnlinkPortfolioId(null);
      mutateLink(undefined);

      if (unlinkedPortfolio()?.userId !== auth.currentUser?.id) {
        navigate('/portfolios');
      } else {
        mutate(unlinkedPortfolio());
      }
    }
  });

  createEffect(() => {
    if (!updatedPortfolio.error && updatedPortfolio()) {
      mutate(updatedPortfolio());
    }
  });

  createEffect(() => {
    if (deletedPortfolio()) {
      navigate('/portfolios');
    }
  });

  const handleSubmit = (values: EditPortfolioForm, event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setFormData(values);
  }

  const formLoading = () => updatedPortfolio.loading || linkedPortfolio.loading || unlinkedPortfolio.loading || deletedPortfolio.loading;
  const creationButtonDisabled = () => portfolio.loading || editPortfolioForm.invalid || formLoading();

  const ownership = () => generatePortfolioOwnership({ userId: auth.currentUser?.id, portfolio: portfolio() });

  const getOwnershipTitle = () => {
    if (ownership() === PortfolioOwnership.Managed || ownership() === PortfolioOwnership.Unconfirmed) return `Managed by ${generateUserName(portfolio()?.portfolioManager)}`;
    if (ownership() === PortfolioOwnership.Managing) return `Managing for ${generateUserName(portfolio()?.user)}`;
    return 'Personal';
  };

  const handleLink = (values: InvestorEmailForm, event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setLinkInvestorEmail(values);
  }

  return (
    <StyledEditPortfolio class="EditPortfolio" colors={colors()}>

      <Show when={!portfolio.error} fallback={portfolio.error.message}>

        <Show when={portfolio.state === 'ready' && portfolio()} fallback={'loading'}>

          {(portfolio) => <>
            <div class="header-content">
              <A href={`/portfolios/${params.id}`} class="link-back">
                <IconButton>
                  <ChevronLeft />
                </IconButton>
              </A>
              <Header title={`Edit portfolio ${portfolio().name || ''}`} subtitle="You can create portfolio here" />
            </div>

            <div class="owner-selection">
              <h3>Portfolio ownership: <span>{getOwnershipTitle()}</span><Show when={formLoading()}><CircularProgress size={16} /></Show></h3>

              <Switch>

                <Match when={ownership() === PortfolioOwnership.Personal}>
                  <h4>Link to investor</h4>
                  <InvestorEmail.Form onSubmit={handleLink}>
                    <InvestorEmail.Field
                      name="email"
                      type="string"
                      validate={[
                        required("Please enter investor's email."),
                        email('Please enter a valid email address.'),
                      ]}
                    >
                      {(field, props) =>
                        <TextField
                          inputProps={{ ...remapFieldProps(props) }}
                          color="secondary"
                          variant="outlined"
                          fullWidth
                          required
                          label="Investor email"
                          value={field.value || ''}
                          disabled={formLoading()}
                          error={Boolean(field.error)}
                          helperText={field.error}

                        />
                      }
                    </InvestorEmail.Field>

                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      disabled={formLoading() || investorEmailForm.invalid}
                    >
                      <Show when={formLoading()} fallback={'Link investor'}><CircularProgress size={16} /></Show>
                    </Button>
                  </InvestorEmail.Form>
                </Match>

                <Match when={ownership() === PortfolioOwnership.Managing}>
                  <h4>Unlink investor from portfolio</h4>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => setUnlinkPortfolioId(params.id)}
                    disabled={formLoading()}
                  >
                    <Show when={formLoading()} fallback={'Unlink investor'}><CircularProgress size={16} /></Show>
                  </Button>
                </Match>

                <Match when={ownership() === PortfolioOwnership.Managed}>
                  <h4>Unlink from portfolio</h4>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => setUnlinkPortfolioId(params.id)}
                    disabled={formLoading()}
                  >
                    <Show when={formLoading()} fallback={'Unlink from portfolio'}><CircularProgress size={16} /></Show>
                  </Button>
                </Match>

                {/* TODO: Implement unconfirmed once implemented */}

              </Switch>

              <ErrorMessage resource={linkedPortfolio} />
              <ErrorMessage resource={unlinkedPortfolio} />

              <SuccessMessage resource={linkedPortfolio} successMessage="Portfolio has been successfully linked to investor" />
              <SuccessMessage resource={unlinkedPortfolio} successMessage="Portfolio has been successfully unlinked." />
            </div>

            <div class="portfolio-edit-form">
              <EditPortfolio.Form onSubmit={handleSubmit}>
                <h3>Portfolio information</h3>

                {/* Invisible field only for the form to have this value */}
                {/* <Field of={editPortfolioForm} name="investorId">
                    {(field) => null}
                  </Field> */}

                <EditPortfolio.Field
                  name="name"
                  type="string"
                  validate={[
                    required('Please enter portfolio name.'),
                    maxLength(20, 'Max length is 20 characters.'),
                  ]}
                >
                  {(field, props) =>
                    <TextField
                      inputProps={{ ...remapFieldProps(props) }}
                      fullWidth
                      label="Portfolio name"
                      color="secondary"
                      variant="outlined"
                      required
                      value={field.value}
                      error={Boolean(field.error)}
                      helperText={field.error}
                      disabled={formLoading()}
                    />}
                </EditPortfolio.Field>
                <EditPortfolio.Field
                  name="description"
                  type="string"
                  validate={[
                    maxLength(240, 'Max length is 240 characters.'),
                  ]}
                >
                  {(field, props) =>
                    <TextField
                      inputProps={{ ...remapFieldProps(props) }}
                      fullWidth
                      label="Portfolio description"
                      color="secondary"
                      variant="outlined"
                      required
                      value={field.value}
                      error={Boolean(field.error)}
                      helperText={field.error}
                      disabled={formLoading()}
                    />}
                </EditPortfolio.Field>
                <EditPortfolio.Field
                  name="url"
                  type="string"
                >
                  {(field, props) =>
                    <TextField
                      inputProps={{ ...remapFieldProps(props) }}
                      fullWidth
                      label="Portfolio url"
                      color="secondary"
                      variant="outlined"
                      required
                      value={field.value}
                      error={Boolean(field.error)}
                      helperText={field.error}
                      disabled={formLoading()}
                    />}
                </EditPortfolio.Field>

                {/* TODO: Add color pickers */}
                <EditPortfolio.Field
                  name="color"
                  type="string"
                >
                  {(field, props) =>
                    <TextField
                      inputProps={{ ...remapFieldProps(props) }}
                      fullWidth
                      label="Portfolio color"
                      color="secondary"
                      variant="outlined"
                      required
                      value={field.value}
                      error={Boolean(field.error)}
                      helperText={field.error}
                      disabled={formLoading()}
                    />}
                </EditPortfolio.Field>

                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  fullWidth
                  disabled={creationButtonDisabled()}
                >
                  <Show when={formLoading()} fallback={'Update portfolio'}><CircularProgress size={16} /></Show>
                </Button>

                <ErrorMessage resource={updatedPortfolio} />

                <SuccessMessage resource={updatedPortfolio} successMessage="Portfolio has been successfully created" />

              </EditPortfolio.Form>
            </div>

            <Show when={ownership() === PortfolioOwnership.Managing || ownership() === PortfolioOwnership.Personal}>
              <div class="portfolio-delete-form">
                <Show
                  when={deleteConfirmVisible()}
                  fallback={
                    <Button
                      color="error"
                      variant="contained"
                      fullWidth
                      disabled={creationButtonDisabled()}
                      onClick={() => setDeleteConfirmVisible(true)}
                    >
                      <Show when={formLoading()} fallback={'Delete portfolio'}><CircularProgress size={16} /></Show>
                    </Button>
                  }
                >
                  <h3>
                    Are you sure you want to delete this portfolio?
                  </h3>
                  <div class="delete-buttons">
                    <Button
                      color="secondary"
                      variant="contained"
                      fullWidth
                      disabled={creationButtonDisabled()}
                      onClick={() => setDeleteConfirmVisible(false)}
                    >
                      <Show when={formLoading()} fallback={'Cancel'}><CircularProgress size={16} /></Show>
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      fullWidth
                      disabled={creationButtonDisabled()}
                      onClick={() => setDeletePortfolioId(params.id)}
                    >
                      <Show when={formLoading()} fallback={'Delete'}><CircularProgress size={16} /></Show>
                    </Button>
                  </div>
                </Show>
              </div>
            </Show>
          </>}

        </Show>
      </Show>

    </StyledEditPortfolio>
  )
}

export default EditPortfolio;