import { createStore } from "solid-js/store";
import RestApiClient from "../services/RestApiClient";
import { Portfolio, PortfolioTypes } from "../types";

type PortfoliosState = {
  managed: Portfolio[];
  managing: Portfolio[];
  personal: Portfolio[];
}

const state: PortfoliosState = {
  managed: [],
  managing: [],
  personal: [],
}

const [portfolios, setPortfolios] = createStore(state);

const setAllPortfolios = (allPortfolios: PortfolioTypes) => setPortfolios((state) => ({ ...state, ...allPortfolios }));

export const getUsersPortfolios = async () => {
  const portfolios = await RestApiClient.getUsersPortfolios();

  if (portfolios) {
    setAllPortfolios(portfolios);
  }
}

export const portfoliosStore = { portfolios, setPortfolios };