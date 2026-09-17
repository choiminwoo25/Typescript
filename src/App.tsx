
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./screens/Home"
import Profile from "./screens/Profile";
import Setting from "./screens/settings";

//전역변수/함수
//페이지 분배를 위한 router 생성
const router = createBrowserRouter([])

 function App() {
  return <div style={{height : '100vh'}}>
    <RouterProvider router={router}/>

  </div>
    
    
  
  
}

export default App