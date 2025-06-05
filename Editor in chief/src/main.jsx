import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; //Import Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import About from './pages/About.jsx';
import Account from './pages/Account.jsx';
import SubmittedArticle from './pages/SubmittedArticle.jsx';
import JournalView from './pages/JournalView.jsx';
import AreaEditors from './pages/AreaEditors.jsx';
import AreaEditorProfile from './pages/AreaEditorProfile.jsx';
import ChiefEditorRecommendation from './pages/ChiefEditorRecommendation.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {path:'/',element:<Home/>},
      {path:'/login',element:<Login/>},
      {path:'/about',element:<About/>},
      {path:'/account',element:<Account/>},
      {path:'/submitted-article',element:<SubmittedArticle/>},  
      {path:'/view-journal/:journalId',element:<JournalView/>},  
      {path:'/area-editor',element:<AreaEditors/>},
      {path:'/area-editor/:areaEditorId',element:<AreaEditorProfile/>},
      {path:'/recommendation/:journalId',element:<ChiefEditorRecommendation/>},
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
