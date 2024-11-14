//utils.js
import axios from "axios";
axios.defaults.baseURL = "http://66c93c23.r20.cpolar.top";
const axiosInstance = axios.create({
  timeout: 5 * 1000, // 请求超时时间（5秒）
  retry: 0, //全局重试次数
  retryDelay: 1000, //全局重试间隔
});

export const request = (options) => {
  return new Promise((resolve, reject) => {
    axiosInstance(options)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};
