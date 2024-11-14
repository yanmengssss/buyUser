import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../views/login/login";
import Home from "../views/layout/layout";
import BookManger from "../views/bookManger/bookManger";
import PersonManger from "../views/personManger/personManger";
import ShowEcharts from "../views/showEchar/showEcharts";
import BorrowManger from "../views/borrowManger/borrowManger";
const routers = [
  {
    path: "/",
    element: <Navigate to="/login" replace />, // 默认重定向到登录页面
  },
  {
    path: "/login",
    element: <Login />, // 登录页面
  },
  {
    path: "/home",
    element: <Home />, // Home 页面
    children: [
      {
        index: true, // 设置默认子路由
        element: <ShowEcharts />, // 默认加载 ShowEcharts
      },
      {
        path: "bookManger", // 路由路径：/home/bookManger
        element: <BookManger />,
      },
      {
        path: "PersonManger", // 路由路径：/home/PersonManger
        element: <PersonManger />,
      },
      {
        path: "ShowEcharts", // 路由路径：/home/ShowEcharts
        element: <ShowEcharts />,
      },
      {
        path: "borrowManger",
        element: <BorrowManger />,
      },
    ],
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter(routers);
