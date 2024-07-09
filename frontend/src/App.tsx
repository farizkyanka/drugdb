import "./App.css";
import RootLayout from "./Pages/RootLayout";
import Home, { HomeLoader } from "./Pages/Home";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Content, { contentLoader, actionDeleteDrug } from "./Pages/Content";
import Login, { actionLogin } from "./components/Login";
import NewDrug from "./Pages/NewDrug";
import EditDrug, { editLoader } from "./Pages/EditDrug";
import { actionForm } from "./components/FormField";
import ErrorPage from "./Pages/ErrorPage";
import Logout, { actionLogout } from "./components/Logout";
import SearchResult, { searchLoader } from "./Pages/SearchResult";
import Register, { action as actionRegister } from "./components/Register";
import ErrorBoundary from "./components/ErrorBoundary";
import { checkAuth } from "./util/auth";

function App() {
  const router = createBrowserRouter([
    {
      path: "drugdb",
      id: "root",
      loader: checkAuth,
      element: <RootLayout />,
      children: [
        {
          index: true,
          errorElement: <ErrorBoundary />,
          element: <Home />,
          loader: HomeLoader,
        },
        {
          path: "drugs/:drugId",
          id: "drug-id",
          errorElement: <ErrorBoundary />,
          element: <Content />,
          loader: contentLoader,
          action: actionDeleteDrug,
        },
        {
          path: "drugs/searchresult",
          errorElement: <ErrorBoundary />,
          element: <SearchResult />,
          loader: searchLoader,
        },
        {
          path: "admin",
          errorElement: <ErrorBoundary />,
          children: [
            {
              path: "login",
              element: <Login />,
              action: actionLogin,
            },
            { path: "logout", action: actionLogout, element: <Logout /> },
            {
              path: "new-drug",
              element: localStorage.getItem("userProfile") ? (
                <NewDrug />
              ) : (
                <Navigate to="../login" />
              ),
              action: actionForm,
            },
            {
              path: "edit-drug/:drugId",
              element: localStorage.getItem("userProfile") ? (
                <EditDrug />
              ) : (
                <Navigate to="../login" />
              ),
              loader: editLoader,
              action: actionForm,
            },
            { path: "register", element: <Register />, action: actionRegister },
          ],
        },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
