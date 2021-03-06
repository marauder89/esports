import axios from "axios";

const _instance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL, timeout: 10000 });

_instance.interceptors.request.use(
  (req) => {
    //console.info(req.method, req.url, req.data);
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

_instance.interceptors.response.use(
  (res) => {
    console.info(JSON.parse(res.data));
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const _axios = async (method, params, url = "") => {
  return await _instance[method](url, params);
};

export default _axios;
