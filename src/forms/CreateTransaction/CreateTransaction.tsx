import { Component, For, Show, createEffect, createResource, createSignal } from "solid-js";
import { createForm, custom, getValue, maxLength, minRange, required, setValue, setValues } from "@modular-forms/solid";
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup } from "@suid/material";

import { Currency, ExecutionType, Transaction, TransactionType } from "../../types";
import { StyledCreateTransaction } from "./CreateTransaction.styles";
import { remapFieldProps } from "../../utils/helpers";
import RestApiClient from "../../services/RestApiClient";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import { tokens, useThemeContext } from "../../styles/theme";
import { getPortfolio } from "../../stores/PortfoliosStore";

const createTransaction = (portfolioId: number, payload: TransactionForm) => {
  const parsed = {
    ...payload,
    price: parseFloat(payload.price.replace(',', '.')),
    numShares: parseFloat(payload?.numShares.replace(',', '.')),
    commissions: payload.commissions ? parseFloat(payload?.commissions.replace(',', '.')) : null,
    execution: payload.execution || ExecutionType.FIFO,
    portfolioId,
  }

  return RestApiClient.createTransaction(parsed);
}

const updateTransaction = (portfolioId: number, payload: TransactionForm, transactionId?: number) => {
  if (!transactionId) return;

  const parsed = {
    ...payload,
    price: parseFloat(payload.price.replace(',', '.')),
    numShares: parseFloat(payload?.numShares.replace(',', '.')),
    commissions: payload.commissions ? parseFloat(payload?.commissions.replace(',', '.')) : null,
    execution: payload.execution || ExecutionType.FIFO,
    portfolioId,
  }

  return RestApiClient.updateTransaction(transactionId, parsed);
}

type TransactionForm = {
  stockName: string;
  stockSector: string;
  transactionTime: string;
  transactionType: TransactionType;
  numShares: string;
  price: string;
  currency: Currency;
  execution: ExecutionType;
  commissions: string;
  notes: string;
}

const initialFormData: TransactionForm = {
  // stockName: '',
  stockName: 'TSLA',
  stockSector: '',
  transactionTime: new Date().toISOString().slice(0, 10),
  transactionType: TransactionType.Buy,
  // numShares: '',
  numShares: '20',
  // price: '',
  price: '10',
  currency: Currency.USD,
  execution: ExecutionType.FIFO,
  commissions: '',
  notes: '',
}

const initialValues = (transaction: Transaction | null): TransactionForm => transaction ? {
  stockName: transaction.stockName,
  stockSector: transaction.stockSector || '',
  transactionTime: new Date(transaction.transactionTime).toISOString().slice(0, 10),
  transactionType: transaction.transactionType,
  numShares: transaction.numShares.toString(),
  price: transaction.price.toString(),
  currency: transaction.currency,
  execution: transaction.execution,
  commissions: (transaction.commissions ?? '').toString(),
  notes: '',
} : initialFormData;

const executionTypes = {
  [ExecutionType.FIFO]: 'FIFO', // First In First Out
  [ExecutionType.LIFO]: 'LIFO', // Last In First Out
  [ExecutionType.WeightedAverage]: 'Weighted average',
  [ExecutionType.SpecificLots]: 'Specific lots',
  [ExecutionType.HighCost]: 'High cost',
  [ExecutionType.LowCost]: 'Low cost',
}

interface ICreateTransactionProps {
  portfolioId: number;
  transaction: Transaction | null;
}


const CreateTransaction: Component<ICreateTransactionProps> = (props) => {
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());

  const isEdit = () => Boolean(props.transaction);

  const [transactionForm, Form] = createForm<TransactionForm>({ initialValues: initialValues(props.transaction), validateOn: "touched" });

  const [createFormData, setCreateFormData] = createSignal<TransactionForm | null>(null);
  const [transactionCreated] = createResource(createFormData, (formData) => createTransaction(props.portfolioId, formData));

  const [updateFormData, setUpdateFormData] = createSignal<TransactionForm | null>(null);
  const [transactionUpdated] = createResource(updateFormData, (formData) => updateTransaction(props.portfolioId, formData, props.transaction?.id));

  createEffect(() => {
    if (transactionCreated()) {
      setValues(transactionForm, initialValues(transactionCreated() || null));
      getPortfolio(props.portfolioId);
    }
  });

  createEffect(() => {
    if (transactionUpdated()) {
      setValues(transactionForm, initialValues(transactionUpdated() || null));
      getPortfolio(props.portfolioId);
    }
  });

  const handleSubmit = (values: TransactionForm, event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (isEdit()) setUpdateFormData(values);
    if (!isEdit()) setCreateFormData(values);
  };

  const transactionLoading = transactionCreated.loading || transactionUpdated.loading;

  return (
    <StyledCreateTransaction class="CreateTransaction" colors={colors()} edit={1}>

      <Form.Form onSubmit={handleSubmit}>
        <div class="transaction-type">

          <Form.Field
            name="transactionType"
          >
            {(field, props) =>
              <ToggleButtonGroup
                color="secondary"
                size="small"
                value={field.value}
                exclusive
                onChange={remapFieldProps(props).onChange}
                fullWidth
              >
                <ToggleButton value={TransactionType.Buy}>Buy</ToggleButton>
                <ToggleButton value={TransactionType.Sell}>Sell</ToggleButton>
                <ToggleButton disabled value={TransactionType.BuyToCover}>Buy to cover</ToggleButton>
                <ToggleButton disabled value={TransactionType.DRIP}>Drip</ToggleButton>
                <ToggleButton disabled value={TransactionType.Dividends}>Dividends</ToggleButton>
                <ToggleButton disabled value={TransactionType.Split}>Split</ToggleButton>
              </ToggleButtonGroup>
            }
          </Form.Field>

        </div>

        <div class="required">
          {/* TODO: Implement search to find stock symbol after API service implementation */}
          <Form.Field
            name="stockName"
            type="string"
            validate={[
              required('Stock symbol is required.'),
              maxLength(20, 'Max character length is 20.')
            ]}
          >
            {(field, props) =>
              <TextField
                inputProps={{ ...remapFieldProps(props) }}
                label="Stock symbol"
                color="secondary"
                variant="outlined"
                size="small"
                required
                value={field.value || ''}
                error={Boolean(field.error)}
                helperText={field.error}
              />
            }
          </Form.Field>

          <Form.Field
            name="transactionTime"
            type="string"
            validate={[
              required('Transaction time is required.')
            ]}
          >
            {(field, props) =>
              <TextField
                inputProps={{ ...remapFieldProps(props) }}
                label="Transaction time"
                color="secondary"
                variant="outlined"
                size="small"
                required
                type="date"
                value={field.value || ''}
                error={Boolean(field.error)}
                helperText={field.error}
              />
            }
          </Form.Field>

          <Form.Field
            name="price"
            validate={[
              required('Price is required.'),
              custom(value => !Number.isNaN(+(value?.replace(',', '.') || '')), 'Value is not a valid number.'),
              minRange(0, 'Price cannot be lower than 0.')
            ]}
          >
            {(field, props) =>
              <TextField
                inputProps={{ ...remapFieldProps(props) }}
                label="Price"
                color="secondary"
                variant="outlined"
                size="small"
                required
                value={field.value || ''}
                error={Boolean(field.error)}
                helperText={field.error}
              />
            }
          </Form.Field>

          <Form.Field
            name="numShares"
            validate={[
              required('Share amount is required.'),
              custom(value => !Number.isNaN(+(value?.replace(',', '.') || '')), 'Value is not a valid number.'),
              minRange(0, 'Share amount cannot be lower than 0.')
            ]}
          >
            {(field, props) =>
              <TextField
                inputProps={{ ...remapFieldProps(props) }}
                label="Share amount"
                color="secondary"
                variant="outlined"
                size="small"
                required
                value={field.value || ''}
                error={Boolean(field.error)}
                helperText={field.error}
              />
            }
          </Form.Field>

          {/* TODO: Add currency support or automaticly input currency on stock selection */}
          <Form.Field
            name="currency"
            type="string"
          >
            {(field, props) =>
              <FormControl>
                <InputLabel color="secondary" id="currency-label">Currency</InputLabel>
                <Select
                  inputProps={{ ...props }}
                  labelId="currency-label"
                  id="currency"
                  value={field.value}
                  label="Currency"
                  color="secondary"
                  size="small"
                  onChange={(e) => setValue(transactionForm, 'currency', e.target.value)}
                >
                  <For
                    each={[
                      { label: 'USD', value: Currency.USD },
                      { label: 'EUR', value: Currency.EUR },
                      { label: 'CZK', value: Currency.CZK },
                    ]}
                  >
                    {({ label, value }) => (
                      <MenuItem value={value}>{label}</MenuItem>
                    )}
                  </For>
                </Select>
              </FormControl>
            }
          </Form.Field>
        </div>

        <div class="defaulted">
          <Form.Field
            name="stockSector"
            type="string"
            validate={[
              maxLength(20, 'Max characters is 20.')
            ]}
          >
            {(field, props) =>
              <TextField
                inputProps={{ ...remapFieldProps(props) }}
                label="Sector"
                color="secondary"
                variant="outlined"
                size="small"
                value={field.value || ''}
                error={Boolean(field.error)}
                helperText={field.error}
              />
            }
          </Form.Field>

          <Form.Field
            name="commissions"
            type="string"
            validate={[
              custom(value => !Number.isNaN(+(value?.replace(',', '.') || '')), 'Value is not a valid number.'),
              minRange(0, 'Commissions cannot be lower than 0.')
            ]}
          >
            {(field, props) =>
              <TextField
                inputProps={{ ...remapFieldProps(props) }}
                label="Commissions"
                color="secondary"
                variant="outlined"
                size="small"
                value={field.value || ''}
                error={Boolean(field.error)}
                helperText={field.error}
              />
            }
          </Form.Field>

          <Show when={getValue(transactionForm, 'transactionType') === TransactionType.Sell}
          >
            <Form.Field
              name="execution"
              type="string"
            >
              {(field, props) =>
                <FormControl>
                  <InputLabel color="secondary" id="execution-label">Execution</InputLabel>
                  <Select
                    inputProps={{ ...props }}
                    labelId="execution-label"
                    id="execution"
                    value={field.value}
                    label="Execution"
                    color="secondary"
                    size="small"
                    onChange={(e) => setValue(transactionForm, 'execution', e.target.value)}
                  >
                    <For
                      each={Object.entries(executionTypes).map(([key, value]) => ({ value: key, label: value }))}
                    >
                      {({ label, value }) => (
                        <MenuItem value={value}>{label}</MenuItem>
                      )}
                    </For>
                  </Select>
                </FormControl>
              }
            </Form.Field>
          </Show>
        </div>

        <Form.Field
          name="notes"
          type="string"
        >
          {(field, props) =>
            <TextField
              inputProps={{ ...remapFieldProps(props) }}
              label="Notes"
              color="secondary"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              required
              value={field.value || ''}
              error={Boolean(field.error)}
              helperText={field.error}
            />
          }
        </Form.Field>

        <div class="buttons">
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            size="small"
            disabled={transactionForm.invalid || transactionLoading}
          >
            <Show when={!transactionLoading} fallback={<CircularProgress size={24} />}>
              <Show when={isEdit()} fallback={'Create Transaction'}>
                Update Transaction
              </Show>
            </Show>
          </Button>

          <ErrorMessage resource={transactionCreated} />
          <SuccessMessage resource={transactionCreated} successMessage="Transaction has been successfully created" />

          <ErrorMessage resource={transactionUpdated} />
          <SuccessMessage resource={transactionUpdated} successMessage="Transaction has been successfully updated" />
        </div>
      </Form.Form>

    </StyledCreateTransaction>
  )
}

export default CreateTransaction;