import RestApiClient from "../services/RestApiClient";
import { useDispatch } from "../store";
import { Portfolio, PortfolioTypes } from "../types";

type PortfoliosState = {
  managed: Portfolio[];
  managing: Portfolio[];
  personal: Portfolio[];
}

export const portfolios = {
  state: {
    managed: [],
    managing: [],
    personal: [],
  } as PortfoliosState,
  reducers: {
    setAllPortfolios: (allPortfolios: PortfolioTypes) => ((state?: PortfoliosState) => ({ ...state, ...allPortfolios }))(),
  },
  effects: {
    async getUsersPortfolios() {
      const dispatch = useDispatch();
      const portfolios = await RestApiClient.getUsersPortfolios();

      if (portfolios) {
        dispatch.portfolios.setAllPortfolios(portfolios);
      }
    },
  }
}