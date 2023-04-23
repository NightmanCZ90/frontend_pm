import { Component, For, Show, createEffect } from "solid-js"
import { Transaction } from "../../types";
import { StyledTransactionList } from "./TransactionList.styles";
import { sortTransactionsByDateAndId } from "../../utils/helpers";
import TransactionCard from "../TransactionCard";

interface ITransactionListProps {
  transactions: Transaction[];
}

const TransactionList: Component<ITransactionListProps> = (props) => {

  const sortedTransactions = () => sortTransactionsByDateAndId(props.transactions);

  return (
    <StyledTransactionList class="TransactionList">
      <Show when={sortedTransactions().length > 0} fallback={'No transactions to show.'}>
        <For each={sortedTransactions()}>
          {(transaction) => <TransactionCard transaction={transaction} />}
        </For>
      </Show>
    </StyledTransactionList>
  )
}

export default TransactionList;