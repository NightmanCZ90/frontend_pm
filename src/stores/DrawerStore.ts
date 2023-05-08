import { createStore } from "solid-js/store";
import { Transaction } from "../types";

export enum DrawerType {
  Transaction = 'transaction',
  // Portfolio = 'portfolio',
}

export type DrawerPayload = {
  [DrawerType.Transaction]: {
    drawerType: DrawerType.Transaction;
    portfolioId: number;
    transaction: Transaction | null;
  };
  // [DrawerType.Portfolio]: {
  //   drawerType: DrawerType.Portfolio;
  //   // portfolioId: number;
  //   // transaction: Transaction | null;
  //   portfolios: [];
  // }
}

type DrawerPayloadState<T extends DrawerType> = {
  drawerType: T | null;
  payload: DrawerPayload[T] | null;
}

const state: DrawerPayloadState<DrawerType> = {
  drawerType: null,
  payload: null,
}

const [drawer, setDrawer] = createStore(state);

export const drawerStore = {
  drawer,
  setDrawer,
};

export const emptyDrawerPayload = () => {
  setDrawer('drawerType', null);
  setDrawer('payload', null);
}

export function setDrawerPayload<T extends DrawerType>(type: T, payload: DrawerPayload[T]) {
  emptyDrawerPayload();
  setDrawer('drawerType', type);
  setDrawer('payload', payload);
}