import { createForm, Field, Form, maxLength, required, setValue, SubmitEvent } from "@modular-forms/solid";
import { A, useParams } from "@solidjs/router";
import { ChevronLeft } from "@suid/icons-material";
import { Button, CircularProgress, IconButton, TextField } from "@suid/material";
import { Component, createEffect, createResource, createSignal, Match, Show, Switch } from "solid-js";
import ErrorMessage from "../../components/ErrorMessage";
import Header from "../../components/Header";
import SuccessMessage from "../../components/SuccessMessage";
import RestApiClient from "../../services/RestApiClient";
import { useSelector } from "../../store";
import { tokens, useThemeContext } from "../../styles/theme";
import { PortfolioOwnership } from "../../types";
import { generatePortfolioOwnership, generateUserName, remapFieldProps } from "../../utils/helpers";
import { StyledEditPortfolio } from "./EditPortfolio.styles";

const getPortfolio = async (id: string) => {
  return RestApiClient.getPortfolio(id);
}

const linkPortfolio = async (id: string, payload: InvestorEmailForm) => {
  return RestApiClient.linkPortfolio(id, payload);
}

// const unlinkPortfolio = async (id: string) => {
//   return RestApiClient.unlinkPortfolio(id);
// }

const updatePortfolio = async (id: string, portfolio: EditPortfolioForm) => {
  return RestApiClient.updatePortfolio(id, portfolio);
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
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());

  // TODO: Proxy is only auth, currentUser is NOT!!
  const { auth } = useSelector();

  const [portfolio, { refetch }] = createResource(params.id, getPortfolio);

  const investorEmailForm = createForm<InvestorEmailForm>({ validateOn: "touched" });

  const [linkInvestorEmail, setLinkInvestorEmail] = createSignal<InvestorEmailForm | null>(null);
  const [linkedPortfolio] = createResource(linkInvestorEmail, (payload) => linkPortfolio(params.id, payload));

  // const [unlinkPortfolioId, setUnlinkPortfolioId] = createSignal<string | null>(null);
  // const [unlinkedPortfolio] = createResource(investorEmail, () => unlinkPortfolio());

  const editPortfolioForm = createForm<EditPortfolioForm>({ validateOn: "touched", initialValues: initialEditPortfolioForm });

  const [formData, setFormData] = createSignal<EditPortfolioForm | null>(null);
  const [updatedPortfolio] = createResource(formData, (formData) => updatePortfolio(params.id, formData));

  createEffect(() => {
    if (!linkedPortfolio.error && linkedPortfolio()) {
      refetch();
    }
  });

  createEffect(() => {
    if ((!portfolio.error && portfolio())) {
      setValue(editPortfolioForm, 'name', portfolio()?.name || '');
      setValue(editPortfolioForm, 'description', portfolio()?.description || '');
      setValue(editPortfolioForm, 'url', portfolio()?.url || '');
      setValue(editPortfolioForm, 'color', portfolio()?.color || '');
    }
  });

  const handleSubmit = (values: EditPortfolioForm, event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setFormData(values);
  }

  const creationButtonDisabled = () => portfolio.loading || editPortfolioForm.invalid || updatedPortfolio.loading;

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

          <div class="header-content">
            <A href={`/portfolios/${params.id}`} class="link-back">
              <IconButton>
                <ChevronLeft />
              </IconButton>
            </A>
            <Header title={`Edit portfolio ${portfolio()?.name || ''}`} subtitle="You can create portfolio here" />
          </div>

          <div class="owner-selection">
            <h3>Portfolio ownership: <span>{getOwnershipTitle()}</span>{portfolio.loading || linkedPortfolio.loading ? <CircularProgress size={16} /> : null}</h3>

            <Switch>

              <Match when={ownership() === PortfolioOwnership.Personal}>
                <h4>Link to investor</h4>
                <Form of={investorEmailForm} onSubmit={handleLink}>
                  <Field
                    of={investorEmailForm}
                    name="email"
                  >
                    {(field) =>
                      <TextField
                        inputProps={{ ...remapFieldProps(field.props) }}
                        color="secondary"
                        variant="outlined"
                        fullWidth
                        required
                        label="Investor email"
                        value={field.value || ''}
                        disabled={portfolio.loading || linkedPortfolio.loading}
                        error={Boolean(field.error)}
                        helperText={field.error}

                      />
                    }
                  </Field>

                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={portfolio.loading || linkedPortfolio.loading || investorEmailForm.invalid}
                  >
                    {(portfolio.loading || linkedPortfolio.loading) ? (<CircularProgress size={24} />) : 'Link investor'}
                  </Button>

                  <ErrorMessage resource={linkedPortfolio} />

                  <SuccessMessage resource={linkedPortfolio} successMessage="Portfolio has been successfully linked to investor" />

                </Form>
              </Match>

            </Switch>
          </div>

          <div class="portfolio-edit-form">
            <Form of={editPortfolioForm} onSubmit={handleSubmit}>
              <h3>Portfolio information</h3>

              {/* Invisible field only for the form to have this value */}
              {/* <Field of={editPortfolioForm} name="investorId">
            {(field) => null}
          </Field> */}

              <Field
                of={editPortfolioForm}
                name="name"
                validate={[
                  required('Please enter portfolio name.'),
                  maxLength(20, 'Max length is 20 characters.'),
                ]}
              >
                {(field) =>
                  <TextField
                    inputProps={{ ...remapFieldProps(field.props) }}
                    fullWidth
                    label="Portfolio name"
                    color="secondary"
                    variant="outlined"
                    required
                    value={field.value}
                    error={Boolean(field.error)}
                    helperText={field.error}
                  />}
              </Field>
              <Field
                of={editPortfolioForm}
                name="description"
                validate={[
                  maxLength(240, 'Max length is 240 characters.'),
                ]}
              >
                {(field) =>
                  <TextField
                    inputProps={{ ...remapFieldProps(field.props) }}
                    fullWidth
                    label="Portfolio description"
                    color="secondary"
                    variant="outlined"
                    required
                    value={field.value}
                    error={Boolean(field.error)}
                    helperText={field.error}
                  />}
              </Field>
              <Field
                of={editPortfolioForm}
                name="url"
              >
                {(field) =>
                  <TextField
                    inputProps={{ ...remapFieldProps(field.props) }}
                    fullWidth
                    label="Portfolio url"
                    color="secondary"
                    variant="outlined"
                    required
                    value={field.value}
                    error={Boolean(field.error)}
                    helperText={field.error}
                  />}
              </Field>

              {/* TODO: Add color pickers */}
              <Field
                of={editPortfolioForm}
                name="color"
              >
                {(field) =>
                  <TextField
                    inputProps={{ ...remapFieldProps(field.props) }}
                    fullWidth
                    label="Portfolio color"
                    color="secondary"
                    variant="outlined"
                    required
                    value={field.value}
                    error={Boolean(field.error)}
                    helperText={field.error}
                  />}
              </Field>

              <Button
                type="submit"
                color="secondary"
                variant="contained"
                fullWidth
                disabled={creationButtonDisabled()}
              >
                {(portfolio.loading || updatedPortfolio.loading) ? (<CircularProgress size={24} />) : "Update portfolio"}
              </Button>

              <ErrorMessage resource={updatedPortfolio} />

              <SuccessMessage resource={updatedPortfolio} successMessage="Portfolio has been successfully created" />

            </Form>
          </div>

        </Show>
      </Show>

    </StyledEditPortfolio>
  )
}

export default EditPortfolio;