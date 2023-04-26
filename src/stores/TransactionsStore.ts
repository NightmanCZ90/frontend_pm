import { createStore } from "solid-js/store";
import { Transaction } from "../types";

export type TransactionCreationPayload = {
  portfolioId: number;
  transaction: Transaction | null;
}

type TransactionsState = {
  drawerPayload: TransactionCreationPayload | null;
}

const state: TransactionsState = {
  drawerPayload: null,
}

const [transactions, setTransactions] = createStore(state);

export const transactionsStore = {
  transactions,
  setTransactions,
};