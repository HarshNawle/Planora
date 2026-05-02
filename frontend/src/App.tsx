import { Route, Routes } from "react-router-dom";
import Home from "./pages/layout/Home";
import AuthLayout from "./pages/Auth/AuthLayout";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import DashBoard from "./pages/dashboard";
import DashBoardLayout from "./pages/dashboard/dashboard-layout";
import Workspaces from "./pages/dashboard/workspaces";
import WorkspaceDetails from "./pages/dashboard/workspaces/workspace-details";

function App() {

  return (
    <Routes>
      <Route path="/auth/" element={<AuthLayout />} >
        <Route index element={<Home />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="verify-email" element={<VerifyEmail />} />
      </Route>

      <Route element={<DashBoardLayout />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/workspaces" element={<Workspaces />} />
        <Route path="/workspaces/:workspaceId" element={<WorkspaceDetails />} />
      </Route>
    </Routes>
  )
}

export default App
