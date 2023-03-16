import { createResource } from "solid-js";
import { useDispatch, useSelector } from "../store";

async function getCurrentUser() {
  const dispatch = useDispatch();

  return dispatch.auth.getCurrentUser(undefined);
}

const useBootstrap = () => {
  const { auth } = useSelector();

  createResource(() => auth.tokens?.accessToken, getCurrentUser);
}

export default useBootstrap;