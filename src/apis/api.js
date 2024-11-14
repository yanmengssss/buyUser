import { request } from "../utils/util";
export const login = (data) => {
  return request({
    url: "/user/login",
    params: data,
  });
};
export const updataBook = (data) => {
  return request({
    url: "/book/updateBook",
    data: data,
    method: "post",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

export const getBookList = (pageSize, pageIndex) => {
  return request({
    url: "/book/getAllBook",
    method: "get",
    params: {
      pageNum: pageIndex,
      pageSize,
    },
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
export const getUserList = (pageSize, pageIndex) => {
  return request({
    url: "/user/getAllUser",
    method: "get",
    headers: {
      token: localStorage.getItem("token"),
    },
    params: {
      pageNum: pageIndex,
      pageSize,
    },
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
export const borrowHistory = (pageSize, pageIndex) => {
  return request({
    url: "/book/getHistory",
    method: "get",
    params: {
      pageNum: pageIndex,
      pageSize,
    },
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

export const setUser = (data) => {
  return request({
    url: "/user/setmanage",
    params: data,
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

export const banUser = (data) => {
  return request({
    url: "/user/lock",
    params: data,
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

export const cancelBan = (data) => {
  return request({
    url: "/user/unlock",
    params: data,
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
