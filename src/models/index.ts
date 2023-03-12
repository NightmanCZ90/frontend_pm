import { auth } from "./Auth";

export interface RootModel {
  auth: typeof auth;
  // portfolios: typeof portfolios;
}

export const storeState = {
  auth: auth.state,
  // portfolios: portfolios.state,
}

export const storeReducers = {
  auth: auth.reducers!,
  // portfolios: portfolios.reducers!,
};

export const storeEffects = {
  auth: auth.effects,
}

export type StoreState = typeof storeState;
export type StoreReducers = typeof storeReducers;
export type StoreEffects = typeof storeEffects;

export type Dispatch = StoreReducers & StoreEffects;