import { request } from "@/utils/util.js";
export const register = (data) => {
  return request({
    url: "/user/registry",
    params: data,
  });
};
export const login = (params) => {
  return request({
    url: "/user/login",
    params,
  });
};
export const getBookList = (params) => {
  return request({
    url: "/book/getAllBook",
    params,
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
export const borrowHistiry = (params) => {
  return request({
    url: "/book/getHistory",
    params,
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
export const borrowBook = (data) => {
  return request({
    url: "/book/rentBook",
    params: data,
    method: "get",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
export const returnBook = (data) => {
  return request({
    url: "/book/backBook",
    params: data,
    method: "get",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
export const getBookDetail = (ISBN) => {
  return request({
    url: `https://62abcd6c.r8.vip.cpolar.cn/getMes/${ISBN}`,
  });
};
export const addBook = (data) => {
  return request({
    url: "/book/InsertBook",
    data: data,
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
