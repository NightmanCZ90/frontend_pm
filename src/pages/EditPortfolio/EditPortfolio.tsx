import { createForm, Field, Form, maxLength, required, setValue, SubmitEvent } from "@modular-forms/solid";
import { A, useParams } from "@solidjs/router";
import { ChevronLeft } from "@suid/icons-material";
import { Button, CircularProgress, IconButton, TextField } from "@suid/material";
import { Component, createEffect, createResource, createSignal, Show } from "solid-js";
import ErrorMessage from "../../components/ErrorMessage";
import Header from "../../components/Header";
import SuccessMessage from "../../components/SuccessMessage";
import RestApiClient from "../../services/RestApiClient";
import { tokens, useThemeContext } from "../../styles/theme";
import { remapFieldProps } from "../../utils/helpers";
import { StyledEditPortfolio } from "./EditPortfolio.styles";

const getPortfolio = async (id: string) => {
  return RestApiClient.getPortfolio(id);
}

const updatePortfolio = async (id: string, portfolio: EditPortfolioForm) => {
  return RestApiClient.updatePortfolio(id, portfolio);
}

export type EditPortfolioForm = {
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
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());
  const params = useParams();

  const [portfolio] = createResource(params.id, getPortfolio);
  const editPortfolioForm = createForm<EditPortfolioForm>({ validateOn: "touched", initialValues: initialEditPortfolioForm });

  const [formData, setFormData] = createSignal<EditPortfolioForm | null>(null);
  const [updatedPortfolio] = createResource(formData, (formData) => updatePortfolio(params.id, formData));

  createEffect(() => {
    if (!portfolio.error && portfolio()) {
      // setValue(editPortfolioForm, 'investorId', portfolio()?.portfolioManager || '');
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

          {/* Add ownership selection */}

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