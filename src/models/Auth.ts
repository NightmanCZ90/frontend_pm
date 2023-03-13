import { storeReducers } from ".";
import RestApiClient from "../services/RestApiClient";
import { Tokens, User } from "../types";

type AuthState = {
  currentUser: User | null;
  tokens: Tokens | null;
}

export const auth = {
  state: {
    currentUser: null,
    tokens: null,
  } as AuthState,
  reducers: {
    setCurrentUser: (currentUser: User | null) => ((state?: AuthState) => ({ ...state, currentUser }))(),
    setTokens: (tokens: Tokens | null) => ((state?: AuthState) => ({ ...state, tokens }))(),
  },
  effects: {
    async signIn(
      { email, password }: { email: string, password: string },
      dispatch?: any,
    ) {
      const tokens = await RestApiClient.signIn({ email, password });

      if (tokens) {
        localStorage.setItem('jwt_token', JSON.stringify(tokens));
        (dispatch as typeof storeReducers).auth.setTokens(tokens);
      }
    },

    async signUp(
      { email, password, confirmPassword }: { email: string, password: string, confirmPassword: string },
      dispatch?: any,
    ) {
      const tokens = await RestApiClient.signUp({ email, password, confirmPassword });

      if (tokens) {
        localStorage.setItem('jwt_token', JSON.stringify(tokens));
        (dispatch as typeof storeReducers).auth.setTokens(tokens);
      }
    },

    signOut(_payload: any, dispatch?: any) {
      localStorage.removeItem('jwt_token');
      window.location.reload();
    }
  }
}