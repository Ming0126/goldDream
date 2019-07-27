import axios from 'axios';
import NProgress from 'nprogress';

const config = {
  method: 'get',
  baseURL: 'http://localhost:8001',
  headers: {
    Accept: 'application/json;charset=utf-8',
    'Content-Type': 'application/json;charset=utf-8',
  },
  timeout: 9990000,
  responseType: 'json',
};

let instance = axios.create(config);

instance.interceptors.request.use(
  config => {
    NProgress.start();
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);
instance.interceptors.response.use(
  response => {
    NProgress.done(response.config.method, response.status);
    if (response.config.method === 'get') {
      if (response.status === 200) {
        return response.data;
      } else {
        Promise.reject(response);
      }
    } else if (response.config.method === 'post') {
      if (response.status === 201) {
        return response.data;
      } else {
        Promise.reject(response);
      }
    }
    return response;
  },
  err => {
    return Promise.reject(err);
  },
);

export default instance;
