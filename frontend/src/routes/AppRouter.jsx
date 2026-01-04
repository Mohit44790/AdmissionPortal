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
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

export default AppRouter;
