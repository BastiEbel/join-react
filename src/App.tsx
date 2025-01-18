import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Summary from "./pages/Summary";
import AddTask from "./pages/AddTask";
import Board from "./pages/Board";
import Contacts from "./pages/Contacts";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProtectedRoute from "./services/ProtectedRoute";

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
    element: <ProtectedRoute element={<Home />} />,
    children: [
      { index: true, element: <Summary /> },
      { path: "summary/:id", element: <Summary /> },
      { path: "addTask/:id", element: <AddTask /> },
      { path: "board/:id", element: <Board /> },
      { path: "contacts/:id", element: <Contacts /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
