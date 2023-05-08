import { createStore } from "solid-js/store";
import { Transaction } from "../types";

export enum DrawerType {
  Transaction = 'transaction',
  // Portfolio = 'portfolio',
}

export type DrawerPayload = {
  [DrawerType.Transaction]: {
    portfolioId: number;
    transaction: Transaction | null;
  };
  // [DrawerType.Portfolio]: {
  //   // portfolioId: number;
  //   // transaction: Transaction | null;
  //   portfolios: [];
  // }
}

type DrawerPayloadState = {
  drawerType: DrawerType | null;
  payload: DrawerPayload | null;
}

const state: DrawerPayloadState = {
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

export const setDrawerPayload = <T extends DrawerType>(type: T, payload: DrawerPayload[T]) => {
  emptyDrawerPayload();
  setDrawer('drawerType', type);
  setDrawer('payload', { [type]: payload });
}

export const getDrawerPayload = <T extends DrawerType>(type: T) => {
  return drawer.payload?.[type];
}