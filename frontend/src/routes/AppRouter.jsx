import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/auth/Register";
import VerifyOtp from "../pages/auth/VerifyOtp";
import Login from "../pages/auth/Login";
import Layout from "../pages/Layout";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Profile from "../components/Profile/Profile";
import AdmissionForm from "../components/Application/Admission/AdmissionForm";
import StudentProfileView from "../components/Profile/StudentProfileView";
import AdminProtectedRoute from "../pages/Admin/routes/AdminProtectedRoute";
import AdminLayout from "../pages/Admin/layout/AdminLayout";
import ProgramMaster from "../pages/Admin/ProgramMaster";
import CollegeMaster from "../pages/Admin/CollegeMaster";
import CourseMaster from "../pages/Admin/CourseMaster";

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
      {
  path: "profile",
  element: <AdmissionForm />,

},{
  path: "profile/view",
  element: <StudentProfileView />,
}

    ],
  },

  /* ADMIN ROUTES */
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      { path: "programs", element: <ProgramMaster /> },
      { path: "colleges", element: <CollegeMaster /> },
      { path: "courses", element: <CourseMaster /> },
    ],
  },
]);

export default AppRouter;
