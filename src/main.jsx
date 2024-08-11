import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home, { homeloader } from './pages/Home.jsx'
import { AuthLayout } from './components/index.js'
import AllPost, { postsloader } from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post,{ postInfoLoader} from './pages/Post.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        loader: homeloader,
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: (<AuthLayout authentication={false}>
          <Login />
          </AuthLayout>)
      },
      {
        path: '/signup',
        element: (<AuthLayout authentication={false}>
          <Signup />
          </AuthLayout>)
      },
      {
        loader:postsloader,
        path: '/posts/:userid',
        element: (<AuthLayout authentication>
          <AllPost />
          </AuthLayout>)
      },
      {
        path: '/create-post',
        element: (<AuthLayout authentication>
          <AddPost />
          </AuthLayout>)
      },
      {
        loader: postInfoLoader,
        path: '/edit-post/:slug',
        element: (<AuthLayout authentication>
          {" "}
          <EditPost />
          </AuthLayout>)
      },
      {
        loader: postInfoLoader,
        path: "/post/:slug",
        element: <Post />,
      }
    ]
  },
      
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>

    </Provider>

  </React.StrictMode>,
)
