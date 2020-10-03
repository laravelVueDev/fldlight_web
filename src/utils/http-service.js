/**
 * axios configuration wrapper and extensions
 */

import axios from "axios";
import { getInstance } from "@/auth/auth.js";

const HttpClient = () => {
  const authService = getInstance();
  const JSON_MIME_TYPE = "application/json";
  const baseConfig = {
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      "Content-Type": JSON_MIME_TYPE,
      Accept: JSON_MIME_TYPE
    }
  };

  const client = axios.create(baseConfig);

  client.interceptors.request.use(
    async config => {
      if (authService && authService.isAuthenticated) {
        const token = await authService.getTokenSilently();

        if (token && config.headers.Authorization === undefined) {
          return Object.assign(config, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
      }

      return config;
    },
    error => Promise.reject(error)
  );

  // auto logout on 4xx responses
  client.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      const statusCode = error.response.status;
      if (statusCode >= 400 && statusCode < 500) {
        authService.logout({
          returnTo: window.location.origin
        });
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export default HttpClient;

// TODO: remove this. how do we use the above from state not just in component as this.$http
const HTTP = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

export { HTTP };
