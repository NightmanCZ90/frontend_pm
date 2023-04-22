import { createResource } from "solid-js";
import { authStore, getCurrentUser } from "../stores/AuthStore";

const useBootstrap = () => {
  const { auth } = authStore;

  createResource(() => auth.tokens?.accessToken, getCurrentUser);
}

export default useBootstrap;