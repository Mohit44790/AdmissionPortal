import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/auth/Register";
import VerifyOtp from "../pages/auth/VerifyOtp";
import Login from "../pages/auth/Login";
import Layout from "../pages/Layout";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Profile from "../components/Profile/Profile";


const AppRouter = createBrowserRouter([
    { index: true, element: <Register /> },
    { path: "verify-otp", element: <VerifyOtp /> },
    { path: "login", element: <Login /> },
  {
    path: "/",
    element: <ProtectedRoute />,
    element: <Layout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      // { path: "admission", element: <AdmissionForm /> },
      // { path: "payment", element: <Payment /> },
    ],
  },
   
]);

export default AppRouter;
