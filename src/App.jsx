import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/user_defualt/Home.jsx";
import Register from "./pages/user_defualt/Register.jsx";
import About from "./pages/user_defualt/About.jsx";
import Login from "./pages/user_defualt/Login.jsx";
import Guides from "./pages/user_defualt/Guides.jsx";
import Contact from "./pages/user_defualt/Contact.jsx";
import Faq from "./pages/user_defualt/Faq.jsx";
import PrivateRoute from "./components/routes/PrivateRoute.jsx";
import PublicRoute from "./components/routes/PublicRoute.jsx";
import Dashboard from "./pages/user_login/Dashboard.jsx";
import Profile from "./pages/user_login/Profile.jsx";
import Training from "./pages/user_login/Training.jsx";
import Supplementation from "./pages/user_login/Supplementation.jsx";
import Blog from "./pages/user_login/Blog.jsx";
import Calculators from "./pages/user_login/Calculators.jsx";
import LayoutLoginUser from "./components/user_login/LayoutLoginUser.jsx";

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes guarded by PublicRoute */}
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <Home />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <PublicRoute>
                            <About />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/faq"
                    element={
                        <PublicRoute>
                            <Faq />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/contact"
                    element={
                        <PublicRoute>
                            <Contact />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/guides"
                    element={
                        <PublicRoute>
                            <Guides />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                {/* Private Routes with Layout */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <LayoutLoginUser>
                                <Dashboard />
                            </LayoutLoginUser>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <LayoutLoginUser>
                                <Profile />
                            </LayoutLoginUser>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/training"
                    element={
                        <PrivateRoute>
                            <LayoutLoginUser>
                                <Training />
                            </LayoutLoginUser>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/supplementation"
                    element={
                        <PrivateRoute>
                            <LayoutLoginUser>
                                <Supplementation />
                            </LayoutLoginUser>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/blog"
                    element={
                        <PrivateRoute>
                            <LayoutLoginUser>
                                <Blog />
                            </LayoutLoginUser>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/calculators"
                    element={
                        <PrivateRoute>
                            <LayoutLoginUser>
                                <Calculators />
                            </LayoutLoginUser>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
