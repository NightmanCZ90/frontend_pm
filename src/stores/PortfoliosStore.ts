import { createStore } from "solid-js/store";
import RestApiClient from "../services/RestApiClient";
import { Portfolio, PortfolioTypes } from "../types";

type PortfoliosState = {
  managed: Portfolio[];
  managing: Portfolio[];
  personal: Portfolio[];
  selectedPortfolio: Portfolio | null;
}

const state: PortfoliosState = {
  managed: [],
  managing: [],
  personal: [],
  selectedPortfolio: null,
}

const [portfolios, setPortfolios] = createStore(state);

const setAllPortfolios = (allPortfolios: PortfolioTypes) => setPortfolios((state) => ({ ...state, ...allPortfolios }));

export const getUsersPortfolios = async () => {
  const portfolios = await RestApiClient.getUsersPortfolios();

  if (portfolios) {
    setAllPortfolios(portfolios);
  }
}

export const getPortfolio = async (portfolioId: string | number) => {
  const portfolio = await RestApiClient.getPortfolio(portfolioId);

  if (portfolio) setPortfolios('selectedPortfolio', portfolio);
  return portfolio;
}

export const portfoliosStore = { portfolios, setPortfolios };