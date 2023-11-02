import './App.css';
import RootLayout from './Pages/RootLayout';
import Home from './Pages/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Content, { contentLoader } from './Pages/Content';
import Login from './components/Login';
import Register from './components/Register';
// import DataModel from './models/DataModel';

const router = createBrowserRouter([{
  path: '/',
  element: <RootLayout/>,
  children: [
    {index: true, element: <Home/>},
  {path: ':drugId', element: <Content/>, loader: contentLoader}]
},{
    path: '/admin',
   children: [
    {path: 'login', element: <Login/>},
    {path: 'register', element: <Register/>},
   ]}])

function App() {
  return <RouterProvider router={router}/>
}

export default App;
