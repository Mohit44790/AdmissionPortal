import { createBrowserRouter ,RouterProvider } from "react-router-dom"
import Register from "./pages/auth/Register"
import Layout from "./pages/Layout"





function App() {
const router = createBrowserRouter([
    {path:'/', element:<Register/>},
    {path:'/', element:<Layout/> 
      ,children:[
        {path:""}
      ]
    }

  ])
  
  

  return (
    <>
     
     <RouterProvider router={router} />
      
    </>
  )
}

export default App
