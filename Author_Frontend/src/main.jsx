import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; //Import Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import PostJournal from './pages/PostJournal.jsx';
import Account from './pages/Account.jsx';
import About from './pages/About.jsx';
import Status from './pages/Status.jsx';

const router=createBrowserRouter(
  [
    {path:'/',
    element:<App/>,
    children:[
      {path:'/',element:<Home/>},
      {path:'/signup',element:<SignUp/>},
      {path:'/login',element:<Login/>},
      {path:'/post-journal',element:<PostJournal/>},
      {path:'/account',element:<Account/>},
      {path:'/about',element:<About/>},
      {path:'/status',element:<Status/>}
    ]}
  ]
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
