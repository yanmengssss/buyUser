import routers from "./router/router";
import { RouterProvider } from "react-router-dom";

import "./App.css";

function App() {
  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
