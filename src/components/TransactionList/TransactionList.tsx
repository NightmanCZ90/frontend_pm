import { Component, For, Show, createEffect, createSignal } from "solid-js"
import { Transaction } from "../../types";
import { StyledTransactionList } from "./TransactionList.styles";
import { sortTransactionsByDateAndId } from "../../utils/helpers";
import TransactionCard from "../TransactionCard";

interface ITransactionListProps {
  transactions: Transaction[];
}

const TransactionList: Component<ITransactionListProps> = (props) => {
  const [openId, setOpenId] = createSignal<number | null>(null);

  const sortedTransactions = () => sortTransactionsByDateAndId(props.transactions);

  return (
    <StyledTransactionList class="TransactionList">
      <Show when={sortedTransactions().length > 0} fallback={'No transactions to show.'}>
        <For each={sortedTransactions()}>
          {(transaction) =>
            <TransactionCard
              transaction={transaction}
              openId={openId()}
              setOpenId={setOpenId}
            />
          }
        </For>
      </Show>
    </StyledTransactionList>
  )
}

export default TransactionList;