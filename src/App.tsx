import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    children: [{ index: true, element: <Login /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
