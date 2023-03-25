import { createForm, Field, Form, maxLength, required, reset, SubmitEvent } from "@modular-forms/solid";
import { A } from "@solidjs/router";
import { ChevronLeft } from "@suid/icons-material";
import { Button, CircularProgress, IconButton, TextField } from "@suid/material";
import { Component, createEffect, createResource, createSignal, For, Show } from "solid-js";
import Header from "../../components/Header";
import RestApiClient from "../../services/RestApiClient";
import { tokens, useThemeContext } from "../../styles/theme";
import { remapFieldProps } from "../../utils/helpers";
import { StyledCreatePortfolio } from "./CreatePortfolio.styles";

async function createPortfolio(payload: CreatePortfolioForm) {

  // TODO: Remove after ownership implementation
  const body = { ...payload, investorId: null }

  return RestApiClient.createPortfolio(body);
}

export type CreatePortfolioForm = {
  name: string,
  description: string,
  color: string,
  url: string,
}

const initialCreatePortfolioForm: CreatePortfolioForm = {
  name: 'default',
  description: '',
  color: 'FFFFFF',
  url: '',
}

interface ICreatePortfolioProps {

}

const CreatePortfolio: Component<ICreatePortfolioProps> = (props) => {
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());

  const createPortfolioForm = createForm<CreatePortfolioForm>({ validateOn: "touched", initialValues: initialCreatePortfolioForm });
  const [formData, setFormData] = createSignal<CreatePortfolioForm | null>(null);

  const [portfolio] = createResource(formData, createPortfolio);

  // Reset form on successful portfolio creation
  createEffect(() => {
    portfolio() && reset(createPortfolioForm);
  });

  const handleSubmit = (values: CreatePortfolioForm, event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setFormData(values);
  }

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

      {/* TODO: Select ownership at creation */}

      <Form of={createPortfolioForm} onSubmit={handleSubmit}>
        <h3>Portfolio information</h3>
        <Field
          of={createPortfolioForm}
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
          of={createPortfolioForm}
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
          of={createPortfolioForm}
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
          of={createPortfolioForm}
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

        <div class="portfolio-form-button">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            fullWidth
            disabled={portfolio.loading || createPortfolioForm.invalid}
          >
            {portfolio.loading ? (<CircularProgress size={24} />) : "Create portfolio"}
          </Button>
        </div>

        {portfolio.error && portfolio.error.message
          ? Array.isArray(portfolio.error.message)
            ? <For each={portfolio.error.message}>
              {(item) => <span class="error-message">{item}</span>}
            </For>
            : <span class="error-message">{portfolio.error?.message}</span>
          : null}
        <Show when={!portfolio.error && portfolio()}>
          <span class="success-message">
            Portfolio has been successfully created
          </span>
        </Show>
      </Form>

    </StyledCreatePortfolio>
  )
}

export default CreatePortfolio;