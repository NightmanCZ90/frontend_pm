import { Component, For, Show, createSignal } from "solid-js"
import { Transaction } from "../../types";
import { StyledTransactionList } from "./TransactionList.styles";
import { sortTransactionsByDateAndId } from "../../utils/helpers";
import TransactionCard from "../TransactionCard";
import { Button } from "@suid/material";
import { transactionsStore } from "../../stores/TransactionsStore";

interface ITransactionListProps {
  transactions: Transaction[];
  portfolioId: number;
}

const TransactionList: Component<ITransactionListProps> = (props) => {
  const [openId, setOpenId] = createSignal<number | null>(null);

  const { setTransactions } = transactionsStore;

  const sortedTransactions = () => sortTransactionsByDateAndId(props.transactions);

  return (
    <StyledTransactionList class="TransactionList">
      <div class="buttons">
        <Button
          color="secondary"
          variant="contained"
          size="small"
          onClick={() => {
            setTransactions('drawerPayload', null);
            setTransactions('drawerPayload', { portfolioId: props.portfolioId, transaction: null });
          }}
        >
          Create new transaction
        </Button>
      </div>
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