import { Component, For, Show, createEffect } from "solid-js"
import { Transaction } from "../../types";
import { StyledTransactionList } from "./TransactionList.styles";
import { sortTransactionsByDateAndId } from "../../utils/helpers";

interface ITransactionListProps {
  transactions: Transaction[];
}

const TransactionList: Component<ITransactionListProps> = (props) => {

  const sortedTransactions = () => sortTransactionsByDateAndId(props.transactions);

  return (
    <StyledTransactionList class="TransactionList">
      <Show when={sortedTransactions().length > 0} fallback={'No transactions to show.'}>
        <For each={sortedTransactions()}>
          {(transaction) => <div>{new Date(transaction.transactionTime).toISOString()} {transaction.stockName} {transaction.price} </div>}
        </For>
      </Show>
    </StyledTransactionList>
  )
}

export default TransactionList;