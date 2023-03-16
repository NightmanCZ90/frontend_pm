import { LoginForm } from "../pages/SignIn/SignIn";
import { RegisterForm } from "../pages/SignUp/SignUp";
import RestApiClient from "../services/RestApiClient";
import { useDispatch } from "../store";
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
    async signIn({ email, password }: LoginForm) {
      const dispatch = useDispatch();
      const tokens = await RestApiClient.signIn({ email, password });

      if (tokens) {
        localStorage.setItem('jwt_token', JSON.stringify(tokens));
        dispatch.auth.setTokens(tokens);
      }
    },

    async signUp({ email, password, confirmPassword }: RegisterForm) {
      const dispatch = useDispatch();
      const tokens = await RestApiClient.signUp({ email, password, confirmPassword });

      if (tokens) {
        localStorage.setItem('jwt_token', JSON.stringify(tokens));
        dispatch.auth.setTokens(tokens);
      }
    },

    signOut() {
      localStorage.removeItem('jwt_token');
      window.location.reload();
    },

    async getCurrentUser() {
      const dispatch = useDispatch();
      const currentUser = await RestApiClient.getCurrentUser();

      if (currentUser) {
        dispatch.auth.setCurrentUser(currentUser);
      }
    },
  }
}