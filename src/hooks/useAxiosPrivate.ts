import { onCleanup } from 'solid-js';

import { axiosPrivate } from '../services/axios';
import { useSelector } from '../store';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useSelector();

  const requestIntercept = axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers?.Authorization) {
        config.headers.Authorization = `Bearer ${auth.tokens?.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const responseIntercept = axiosPrivate.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newAccessToken = await refresh();

        const savedToken = localStorage.getItem('jwt_token');
        if (savedToken) {
          const parsedToken = JSON.parse(savedToken);
          localStorage.setItem('jwt_token', JSON.stringify({ ...parsedToken, accessToken: newAccessToken }));
        }
        prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  onCleanup(() => {
    axiosPrivate.interceptors.request.eject(requestIntercept);
    axiosPrivate.interceptors.response.eject(responseIntercept);
  });

  return axiosPrivate;
}

export default useAxiosPrivate;