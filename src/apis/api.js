import { request } from "./utils";
export const register = (data) => {
  return request({
    url: "/regin",
    data: data,
    method: "POST",
  });
};
export const login = (params) => {
  return request({
    url: "/login",
    params,
  });
};
export const rebackPassword = (data) => {
  return request({
    url: "/changePassword",
    data: data,
    method: "POST",
  });
};
