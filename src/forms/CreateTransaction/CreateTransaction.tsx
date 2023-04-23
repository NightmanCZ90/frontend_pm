import { Component, For, Show, createResource, createSignal } from "solid-js";
import { createForm, custom, getValue, maxLength, minRange, required, setValue } from "@modular-forms/solid";
import { FormControl, InputLabel, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup } from "@suid/material";

import { Currency, ExecutionType, Transaction, TransactionType } from "../../types";
import { StyledCreateTransaction } from "./CreateTransaction.styles";
import { remapFieldProps } from "../../utils/helpers";

const createTransaction = (data: TransactionForm) => {
  const parsed = {
    ...data,
    price: parseFloat(data.price.replace(',', '.')),
    numShares: parseFloat(data?.numShares.replace(',', '.')),
    commissions: data.commissions ? parseFloat(data?.commissions.replace(',', '.')) : null,
  }

  console.log(parsed);
  return;
}

const initialFormData = {
  stockName: '',
  stockSector: '',
  transactionTime: new Date().toISOString().slice(0, 10),
  transactionType: TransactionType.Buy,
  numShares: '',
  price: '',
  currency: Currency.USD,
  execution: ExecutionType.FIFO,
  commissions: '',
  notes: '',
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

const executionTypes = {
  fifo: 'FIFO', // First In First Out
  lifo: 'LIFO', // Last In First Out
  weightedAverage: 'Weighted average',
  specificLots: 'Specific lots',
  highCost: 'High cost',
  lowCost: 'Low cost',
}

interface ICreateTransactionProps {
  portfolioId: number;
  transaction?: Transaction;
}


const CreateTransaction: Component<ICreateTransactionProps> = (props) => {

  const [transactionForm, Form] = createForm<TransactionForm>({ initialValues: initialFormData, validateOn: "touched" });
  const [formData, setFormData] = createSignal<TransactionForm | null>(null);

  const [] = createResource(formData, createTransaction);

  const handleSubmit = (values: TransactionForm, event: SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setFormData(values);
  }

  return (
    // <StyledCreateTransaction edit={isEdit ? 1 : 0}>
    <StyledCreateTransaction edit={1}>

      <Form.Form onSubmit={handleSubmit}>
        <div class="transaction-type">

          <Form.Field
            name="transactionType"
          // type="string"
          >
            {(field, props) =>
              <ToggleButtonGroup
                color="secondary"
                value={field.value}
                exclusive
                onChange={remapFieldProps(props).onChange}
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
            // type="string"
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
                required
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
                required
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
                    onChange={(e) => setValue(transactionForm, 'execution', e.target.value)}
                  >
                    <For
                      each={[
                        { label: 'FIFO', value: ExecutionType.FIFO },
                        { label: 'LIFO', value: ExecutionType.LIFO },
                        { label: 'Weighted Average', value: ExecutionType.WeightedAverage },
                        { label: 'Specific Lots', value: ExecutionType.SpecificLots },
                        { label: 'High Cost', value: ExecutionType.HighCost },
                        { label: 'Low Cost', value: ExecutionType.LowCost },
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
          <button type="submit">Check</button>
        </div>
      </Form.Form>

    </StyledCreateTransaction>
  )
}

export default CreateTransaction;