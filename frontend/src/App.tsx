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

function App() {

  return (
    <Routes>
      <Route path="/auth/" element={<AuthLayout />} >
        <Route index element={<Home />} />
        <Route path="sign-up" element={<Signup/>} />
        <Route path="login" element={<Login/>} />
        <Route path="forgot-password" element={<ForgotPassword/>} />
        <Route path="reset-password" element={<ResetPassword/>} />
        <Route path="verify-email" element={<VerifyEmail/>} />
      </Route>

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashBoardLayout />}>
        <Route index element={<DashBoard />} />
      </Route>

      {/* Workspace Routes */}
      <Route path="/workspaces" element={<DashBoardLayout />}>
        <Route index element={<Workspaces />} />
      </Route>
    </Routes>
  )
}

export default App
