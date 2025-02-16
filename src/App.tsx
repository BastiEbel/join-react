import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProtectedRoute from "./components/protectionPages/ProtectedRoute";
import { lazy, Suspense } from "react";

const LazySummary = lazy(() => import("./pages/Summary"));
const LazyAddTask = lazy(() => import("./pages/AddTask"));
const LazyBoard = lazy(() => import("./pages/Board"));
const LazyContacts = lazy(() => import("./pages/Contacts"));

const router = createBrowserRouter([
  {
    path: "/login",
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
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazySummary />
          </Suspense>
        ),
      },
      {
        path: "summary/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazySummary />
          </Suspense>
        ),
      },
      {
        path: "addTask/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyAddTask />
          </Suspense>
        ),
      },
      {
        path: "board/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyBoard />
          </Suspense>
        ),
      },
      {
        path: "contacts/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyContacts />
          </Suspense>
        ),
      },
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
