import axios from 'axios';

const apiRequest = (method, url, auth, options = {}) => {
  const config = { method, url, auth };

  if (options.body) {
    config.data = options.body;
  }

  config.headers = { 'Content-Type': 'application/json' };
  return axios(config);
};

export default apiRequest
