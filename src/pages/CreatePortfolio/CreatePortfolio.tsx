import { createForm, email, maxLength, required, reset, setValue, SubmitEvent } from "@modular-forms/solid";
import { A } from "@solidjs/router";
import { ChevronLeft } from "@suid/icons-material";
import { Button, CircularProgress, FormControlLabel, IconButton, Switch, TextField } from "@suid/material";
import { Component, createEffect, createResource, createSignal, Show } from "solid-js";
import ErrorMessage from "../../components/ErrorMessage";
import Header from "../../components/Header";
import SuccessMessage from "../../components/SuccessMessage";
import RestApiClient from "../../services/RestApiClient";
import { tokens, useThemeContext } from "../../styles/theme";
import { remapFieldProps } from "../../utils/helpers";
import { StyledCreatePortfolio } from "./CreatePortfolio.styles";

async function checkInvestor(payload: InvestorCheckForm) {
  return RestApiClient.checkInvestor(payload.investorEmail);
}

async function createPortfolio(payload: CreatePortfolioForm) {
  return RestApiClient.createPortfolio(payload);
}

export type InvestorCheckForm = {
  investorEmail: string;
}

export type CreatePortfolioForm = {
  investorId: number | null;
  name: string,
  description: string,
  color: string,
  url: string,
}

const initialCreatePortfolioForm: CreatePortfolioForm = {
  investorId: null,
  name: '',
  description: '',
  color: 'FFFFFF',
  url: '',
}

interface ICreatePortfolioProps {

}

const CreatePortfolio: Component<ICreatePortfolioProps> = (props) => {
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());

  const [isManaging, setIsManaging] = createSignal<boolean>(false);
  const [emailChanged, setEmailChanged] = createSignal(false);

  // Investor email check
  const [investorCheckForm, InvestorCheck] = createForm<InvestorCheckForm>({ validateOn: "touched" });
  const [investorEmail, setInvestorEmail] = createSignal<InvestorCheckForm | null>(null);
  const [investorId] = createResource(investorEmail, checkInvestor);

  // Portfolio creation
  const [createPortfolioForm, CreatePortfolio] = createForm<CreatePortfolioForm>({ validateOn: "touched", initialValues: initialCreatePortfolioForm });
  const [formData, setFormData] = createSignal<CreatePortfolioForm | null>(null);
  const [portfolio] = createResource(formData, createPortfolio);

  // Set investor Id to portfolio creation form on success
  createEffect(() => {
    if (!investorId.error && investorId()) {
      setValue(createPortfolioForm, "investorId", investorId()?.id || null);
    }
  });

  // Reset forms on successful portfolio creation
  createEffect(() => {
    if (!portfolio.error && portfolio()) {
      reset(createPortfolioForm);
      reset(investorCheckForm);
      setEmailChanged(true);
    }
  });

  const handleCheckInvestor = (values: InvestorCheckForm, event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setEmailChanged(false);
    setInvestorEmail(values);
  }

  const handleSubmit = (values: CreatePortfolioForm, event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setFormData(values);
  }

  const creationButtonDisabled = () => portfolio.loading || createPortfolioForm.invalid || (isManaging() && (emailChanged() || investorId.loading || investorCheckForm.invalid || investorId.error || !investorId()));

  return (
    <StyledCreatePortfolio class="CreatePortfolio" colors={colors()}>

      <div class="header-content">
        <A href={"/portfolios"} class="link-back">
          <IconButton>
            <ChevronLeft />
          </IconButton>
        </A>
        <Header title={'Create portfolio'} subtitle="You can create portfolio here" />
      </div>

      <div class="owner-selection">
        <h3>Select portfolio option</h3>
        <FormControlLabel
          control={
            <Switch
              color="secondary"
              onChange={(e, value) => setIsManaging(value)}
              checked={isManaging()}
              size="small"
            />
          }
          label={isManaging() ? 'Managing' : 'Personal'}
        />

        <Show when={isManaging()}>
          <div class="investor-selection">
            <InvestorCheck.Form onSubmit={handleCheckInvestor}>
              <InvestorCheck.Field
                type="string"
                name="investorEmail"
                validate={[
                  required("Please enter investor's email."),
                  email('Please enter a valid email address.'),
                ]}
              >
                {(field, props) =>
                  <TextField
                    inputProps={{ ...remapFieldProps(props) }}
                    fullWidth
                    type="email"
                    label="Managed investor email"
                    onChange={() => setEmailChanged(true)}
                    color={!investorId.error && investorId() && !emailChanged() ? "success" : "secondary"}
                    focused={!investorId.error && investorId() && !emailChanged() ? true : undefined}
                    variant="outlined"
                    size="small"
                    required
                    value={field.value || ''}
                    error={Boolean(field.error) || (investorId.error && !emailChanged())}
                    helperText={field.error}
                  />}
              </InvestorCheck.Field>

              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="small"
                disabled={investorId.loading || investorCheckForm.invalid}
              >
                <Show when={investorId.loading} fallback="Check user">
                  <CircularProgress size={24} />
                </Show>
              </Button>

              <ErrorMessage resource={!emailChanged() ? investorId : null} />

              <SuccessMessage resource={!emailChanged() ? investorId : null} successMessage="User is checked. You can continue with portfolio creation." />

            </InvestorCheck.Form>

          </div>
        </Show>
      </div>

      <div class="portfolio-creation-form">
        <CreatePortfolio.Form onSubmit={handleSubmit}>
          <h3>Portfolio information</h3>

          {/* Invisible field only for the form to have this value */}
          <CreatePortfolio.Field type="number" name="investorId">
            {(field) => null}
          </CreatePortfolio.Field>

          <CreatePortfolio.Field
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
                size="small"
                required
                value={field.value}
                error={Boolean(field.error)}
                helperText={field.error}
              />}
          </CreatePortfolio.Field>

          <CreatePortfolio.Field
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
                size="small"
                required
                value={field.value}
                error={Boolean(field.error)}
                helperText={field.error}
              />}
          </CreatePortfolio.Field>

          <CreatePortfolio.Field
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
                size="small"
                required
                value={field.value}
                error={Boolean(field.error)}
                helperText={field.error}
              />}
          </CreatePortfolio.Field>

          {/* TODO: Add color pickers */}
          <CreatePortfolio.Field
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
                size="small"
                required
                value={field.value}
                error={Boolean(field.error)}
                helperText={field.error}
              />}
          </CreatePortfolio.Field>

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            size="small"
            fullWidth
            disabled={creationButtonDisabled()}
          >
            {portfolio.loading ? (<CircularProgress size={24} />) : "Create portfolio"}
          </Button>

          <ErrorMessage resource={portfolio} />

          <SuccessMessage resource={portfolio} successMessage="Portfolio has been successfully created" />

        </CreatePortfolio.Form>
      </div>

    </StyledCreatePortfolio>
  )
}

export default CreatePortfolio;