import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Summary from "./pages/Summary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [{ path: "summary", element: <Summary /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
