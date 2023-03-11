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
}