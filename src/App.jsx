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
import { ForgetPassword } from "./pages/Auth/ForgetPassword";
import { DashboardContextProvider } from "./context/DashboardContext";
import { InterviewView } from "./pages/Interview";
import QuizTest from "./pages/QuizTest";
import { OATestContextProvider } from "./context/OATestContext";
import Feedback from "./pages/Feedback";
import Pricing from "./pages/Pricing";
import NotFoundPage from "./pages/NotFoundPage";
import { ProtectedRoute } from "./components/General/ProtectedRoute";

function App() {
  return (
    <AuthContextProvider>
      <DashboardContextProvider>
        <OATestContextProvider>
          <div className="app">
            <Routes>
              {/* 🧭 Public Routes */}
              <Route path="/" element={<NavbarLayout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="contactus" element={<ContactUs />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="pricing" element={<Pricing />} />

                {/* 🔒 Protected Routes inside Navbar layout */}
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="dashboard/:type/feedback/:testId"
                  element={
                    <ProtectedRoute>
                      <Feedback />
                    </ProtectedRoute>
                  }
                />
              </Route>

              <Route
                path="/test"
                element={
                  <ProtectedRoute>
                    <AllTestProblems />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/test/section/question"
                element={
                  <ProtectedRoute>
                    <OATestProblem />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/test/section/quiz"
                element={
                  <ProtectedRoute>
                    <QuizTest />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/interview"
                element={
                  <ProtectedRoute>
                    <InterviewView />
                  </ProtectedRoute>
                }
              />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </OATestContextProvider>
      </DashboardContextProvider>
    </AuthContextProvider>
  );
}

export default App;
