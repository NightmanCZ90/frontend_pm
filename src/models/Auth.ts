import { User } from "../types";

type AuthState = {
  currentUser: User | null;
}

export const auth = {
  state: {
    currentUser: null,
  } as AuthState,
  reducers: {
    setCurrentUser: (currentUser: User | null) => ((state?: AuthState) => ({ ...state, currentUser }))(),
  },
}