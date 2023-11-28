import './App.css';
import RootLayout from './Pages/RootLayout';
import Home from './Pages/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Content, { contentLoader, actionDeleteDrug } from './Pages/Content';
import Login, { actionLogin } from './components/Login';
import NewDrug from './Pages/NewDrug';
import EditDrug, { editLoader } from './Pages/EditDrug';
import { actionForm } from './components/FormField'
import ErrorPage from './Pages/ErrorPage';
// import DataModel from './models/DataModel';

const router = createBrowserRouter([{
  path: '/',
  element: <RootLayout/>,
  children: [
    {index: true, element: <Home/>},
    {path: '/drugs/:drugId', element: <Content/>, loader: contentLoader, action: actionDeleteDrug},
    {
      path: '/admin',
      children: [
      {path: 'login', element: <Login/>, action: actionLogin},
      // {path: 'register', element: <Register/>},
      {path: 'new-drug', element: <NewDrug/>, action: actionForm},
      {path: 'edit-drug/:drugId', element: <EditDrug/>, loader: editLoader, action: actionForm}
     ]},
     {path: '*', element: <ErrorPage/>}
  ]
}])

function App() {
  return <RouterProvider router={router}/>
}

export default App;
