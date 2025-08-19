import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavbarLayout from "./layouts/NavbarLayout";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUS";
import SignUpPage from "./pages/Auth/SignUpPage";
import LoginPage from "./pages/Auth/LoginPage";
import { AuthContextProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { OATestProblem } from "./pages/OATestProblem";
import AllTestProblems from "./pages/AllTestProblems";

function App() {
  return (
    <AuthContextProvider>
      <div className="app">
        {/* <NavbarLayout /> */}
        <Routes>
          <Route path="/" element={<NavbarLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
            <Route path="/test/problem" element={<AllTestProblems />} />
            <Route path="/test/problem/:id" element={<OATestProblem />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
