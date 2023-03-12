import axios from '../services/axios';
import { useDispatch, useSelector } from '../store';

const useRefreshToken = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector();

  const refresh = async () => {
    try {
      const response = await axios.post('/auth/refresh', null, { headers: { Authorization: `Bearer ${auth.tokens?.refreshToken}` } });

      if (response?.data) {
        const { accessToken } = response.data;

        if (auth.tokens) dispatch.auth.setTokens({ ...auth.tokens, accessToken });
      }
      return response?.data?.accessToken;
    } catch (err) {
      dispatch.auth.signOut(undefined);
    }
  }
  return refresh;
}

export default useRefreshToken;