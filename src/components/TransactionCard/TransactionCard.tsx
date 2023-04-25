import { Component, Setter, Show, createEffect, createResource, createSignal } from "solid-js";
import { FileDownload, Upload } from "@suid/icons-material";
import { Button, CircularProgress } from "@suid/material";

import { Transaction, TransactionType } from "../../types";
import { StyledTransactionCard } from "./TransactionCard.styles";
import { tokens, useThemeContext } from "../../styles/theme";
import { formatterWithCurrency } from "../../App";
import RestApiClient from "../../services/RestApiClient";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import { transactionsStore } from "../../stores/TransactionsStore";

const deleteTransaction = async (id: number) => {
  return await RestApiClient.deleteTransaction(id);
}

interface ITransactionCardProps {
  transaction: Transaction;
  openId: number | null;
  setOpenId: Setter<number | null>;
}

const TransactionCard: Component<ITransactionCardProps> = (props) => {
  const [mode] = useThemeContext();
  const colors = () => tokens(mode());

  const { setTransactions } = transactionsStore;

  const [deleteConfirmVisible, setDeleteConfirmVisible] = createSignal<boolean>(false);
  const [deleteTransactionId, setDeleteTransactionId] = createSignal<number | null>(null);

  const [transactionDeleted] = createResource(deleteTransactionId, deleteTransaction);

  // Cleanup states on unselecting transaction
  createEffect(() => {
    if (props.openId !== props.transaction.id) {
      setDeleteConfirmVisible(false);
    }
  });

  const renderIcon = (transactionType: TransactionType) => {
    if (transactionType === TransactionType.Buy) return <FileDownload fontSize="large" />;
    if (transactionType === TransactionType.Sell) return <Upload fontSize="large" />;
  }

  const calculateTransactionCharge = (transactionType: TransactionType, numShares: number, price: number) => {
    let charge = 0;
    if (transactionType === TransactionType.Buy) charge = -1 * price;
    if (transactionType === TransactionType.Sell) charge = 1 * price;
    return formatterWithCurrency.format(numShares * charge);
  }

  const calculateShares = (transactionType: TransactionType, numShares: number) => {
    let shares = 0;
    if (transactionType === TransactionType.Buy) shares = 1;
    if (transactionType === TransactionType.Sell) shares = -1;
    return numShares * shares;
  }

  const deleteButtonDisabled = () => transactionDeleted.loading;

  return (
    <StyledTransactionCard
      class="TransactionCard"
      colors={colors()}
      onClick={() => props.setOpenId(prevId => prevId === props.transaction.id ? null : props.transaction.id)}
    >
      <div class="content">

        <div class="top">
          <div class="transaction-type">
            <div class={`icon ${props.transaction.transactionType}`}>
              {renderIcon(props.transaction.transactionType)}
            </div>
            {props.transaction.transactionType.toUpperCase()}
            <h3>{props.transaction.stockName}</h3>
          </div>
          {calculateTransactionCharge(props.transaction.transactionType, props.transaction.numShares, props.transaction.price)}
        </div>

        <div class="middle">
          <div class="info">

            <div class="num-shares">
              {calculateShares(props.transaction.transactionType, props.transaction.numShares)}
              &nbsp;
              shares
            </div>

            <div class="price">
              {props.transaction.price}
              &nbsp;
              {props.transaction.currency}
            </div>

          </div>

          <div class="date">
            {new Date(props.transaction.transactionTime).toLocaleDateString()}
          </div>
        </div>

        <Show when={props.openId === props.transaction.id}>
          <div class="bottom">
            <Show
              when={deleteConfirmVisible()}
              fallback={
                <div class="buttons">
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    disabled={deleteButtonDisabled()}
                    onClick={() => setDeleteConfirmVisible(true)}
                  >
                    <Show when={transactionDeleted.loading} fallback={'Delete portfolio'}><CircularProgress size={16} /></Show>
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    disabled={deleteButtonDisabled()}
                    onClick={() => setTransactions('creationPayload', { portfolioId: props.transaction.portfolioId, transaction: props.transaction })}
                  >
                    {/* <Show when={formLoading()} fallback={'Delete portfolio'}><CircularProgress size={16} /></Show> */}
                    Edit transaction
                  </Button>
                </div>
              }
            >
              <h4>
                Are you sure you want to delete this transaction?
              </h4>
              <div class="delete-buttons">
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  disabled={deleteButtonDisabled()}
                  onClick={() => setDeleteConfirmVisible(false)}
                >
                  <Show when={transactionDeleted.loading} fallback={'Cancel'}><CircularProgress size={16} /></Show>
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  size="small"
                  disabled={deleteButtonDisabled()}
                  onClick={() => setDeleteTransactionId(props.transaction.id)}
                >
                  <Show when={transactionDeleted.loading} fallback={'Delete'}><CircularProgress size={16} /></Show>
                </Button>
              </div>

              <ErrorMessage resource={transactionDeleted} />

              <SuccessMessage resource={transactionDeleted} successMessage="Transaction has been successfully deleted" />
            </Show>
          </div>
        </Show>

      </div>
    </StyledTransactionCard>
  )
}

export default TransactionCard;