
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./screens/Home"
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import CreateAccount from "./screens/Create-Account";
import Login from "./screens/Login-Account";
import Layout from "./screens/Layout";

//전역변수/함수
//페이지 분배를 위한 router 생성
const router = createBrowserRouter([
  {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:'',
          element:<Home/>
        },
        {
          path:'profile',
          element:<Profile/>
        },
        {
          path:'settings',
          element:<Settings/>
        }
      ]
  },

  {
    path:'/Create-Account',
    element:<CreateAccount/>
  },
  {
    path:'login',
    element:<Login/>
  }
])


 function App() {
  return <div style={{height : '100vh'}}>
    <RouterProvider router={router}/>

  </div>
    
    
  
  
}

export default App