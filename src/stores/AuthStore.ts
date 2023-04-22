import { createStore } from "solid-js/store";
import { Tokens, User } from "../types";
import { LoginForm } from "../pages/SignIn/SignIn";
import RestApiClient from "../services/RestApiClient";
import { UserAccountForm } from "../pages/UserAccount/UserAccount";
import { RegisterForm } from "../pages/SignUp/SignUp";

type AuthState = {
  currentUser: User | null;
  tokens: Tokens | null;
}

const state: AuthState = {
  currentUser: null,
  tokens: null,
}

const [auth, setAuth] = createStore(state);

export const signIn = async ({ email, password }: LoginForm) => {
  const tokens = await RestApiClient.signIn({ email, password });

  if (tokens) {
    localStorage.setItem('jwt_token', JSON.stringify(tokens));
    setAuth('tokens', tokens);
  }
}

export const signUp = async ({ email, password, confirmPassword }: RegisterForm) => {
  const tokens = await RestApiClient.signUp({ email, password, confirmPassword });

  if (tokens) {
    localStorage.setItem('jwt_token', JSON.stringify(tokens));
    setAuth('tokens', tokens);
  }
}

export const signOut = () => {
  localStorage.removeItem('jwt_token');
  window.location.reload();
}

export const getCurrentUser = async () => {
  const currentUser = await RestApiClient.getCurrentUser();

  // TODO: Implement currency
  if (!currentUser.currency) {
    currentUser.currency = 'USD';
  }

  if (currentUser) {
    setAuth('currentUser', currentUser);
  }
}

export const updateCurrentUser = async (payload: UserAccountForm) => {

  if (!auth.currentUser) return;

  const updatedUser = await RestApiClient.updateUser(auth.currentUser.id, { ...payload, role: auth.currentUser.role });

  if (updatedUser) {
    setAuth('currentUser', updatedUser);
  }
}

export const authStore = {
  auth,
  setAuth,
};