import { Routes, Route, Navigate  } from "react-router";
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import { useEffect } from "react";
import Welcome from "./pages/Welcome";
import Setup from "./pages/Setup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


function App() {
  const isLoggedIn = JSON.parse(localStorage.getItem("keepLoggedIn"))
  useEffect(() => {
    console.log('refresh', isLoggedIn )

  },[isLoggedIn])
  return (
    <>
      <Routes>
        <Route path="/" element={ isLoggedIn ? <Navigate to={"/dashboard"} /> : <Welcome  />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={ <Signup /> } />
        {console.log(isLoggedIn,"" )}
        <Route path="/dashboard" element={ isLoggedIn ? <Dashboard /> : <Navigate to={"/login"} />} />
        <Route path="/setup" element={ <Setup /> } />
        <Route path="/forget-password" element={ <ForgotPassword /> } />
        <Route  path="/reset-password" element={ <ResetPassword /> } />

      </Routes>
    </>
  );
}

export default App;
