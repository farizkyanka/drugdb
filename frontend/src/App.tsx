import './App.css';
import RootLayout from './Pages/RootLayout';
import Home from './Pages/Home';
import { LoaderFunction, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Content, { contentLoader, actionDeleteDrug } from './Pages/Content';
import Login, { actionLogin } from './components/Login';
import NewDrug from './Pages/NewDrug';
import EditDrug, { editLoader } from './Pages/EditDrug';
import { actionForm } from './components/FormField'
import ErrorPage from './Pages/ErrorPage';
import { actionLogout } from './components/Logout';
import { checkAuthLoader } from './util/auth';
import { UserProvider } from './contexts/UserContext';
// import DataModel from './models/DataModel';

function App() {
  const router = createBrowserRouter(
    [{
      element: <UserProvider/>,
      children: [{
        path: '/',
        element: <RootLayout/>,
        children: [
        {index: true, element: <Home/>},
        {path: '/drugs/:drugId', id: 'drug-id', element: <Content/>, loader: contentLoader, action: actionDeleteDrug},
        {
          path: '/admin',
          children: [
          {path: 'login', element: <Login/>, action: actionLogin},
          {path: 'logout', action: actionLogout},
          // {path: 'register', element: <Register/>},
          {path: 'new-drug', element: <NewDrug/>, loader: checkAuthLoader as LoaderFunction, action: actionForm},
          {path: 'edit-drug/:drugId', element: <EditDrug/>, loader: editLoader, action: actionForm}
          ]},
         {path: '*', element: <ErrorPage/>}
      ]}
      ]
    }]
  );

  return <RouterProvider router={router}/>
}

export default App;
