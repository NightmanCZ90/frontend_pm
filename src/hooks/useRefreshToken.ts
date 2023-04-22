import { authStore, signOut } from '../stores/AuthStore';
import axios from '../services/axios';

const useRefreshToken = () => {
  const { auth, setAuth } = authStore;

  const refresh = async () => {
    try {
      const response = await axios.post('/auth/refresh', null, { headers: { Authorization: `Bearer ${auth.tokens?.refreshToken}` } });

      if (response?.data) {
        const { accessToken } = response.data;

        if (auth.tokens) setAuth('tokens', { ...auth.tokens, accessToken });
      }
      return response?.data?.accessToken;
    } catch (err) {
      signOut();
    }
  }
  return refresh;
}

export default useRefreshToken;