import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Summary from "./pages/Summary";
import AddTask from "./pages/AddTask";
import Board from "./pages/Board";
import Contacts from "./pages/Contacts";

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
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <Summary /> },
      { path: "summary", element: <Summary /> },
      { path: "addTask", element: <AddTask /> },
      { path: "board", element: <Board /> },
      { path: "contacts", element: <Contacts /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
