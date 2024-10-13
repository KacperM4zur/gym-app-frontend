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
import CreatePost from "./components/user_login/blog_page/CreatePost.jsx";
import TrainerDashboard from "./pages/trainer/TrainerDashboard.jsx";
import TrainerLayout from "./components/trainer/TrainerLayout.jsx";
import EducationalMaterials from "./pages/trainer/EducationalMaterials.jsx";
import TrainingPlans from "./pages/trainer/TrainingPlans.jsx";
import SupplementPlans from "./pages/trainer/SupplementPlans.jsx";
import Clients from "./pages/trainer/Clients.jsx";
import ProgressTracking from "./pages/trainer/ProgressTracking.jsx";
import Consultations from "./pages/user_login/Consultations.jsx";
import Progress from "./pages/user_login/Progress.jsx";

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes guarded by PublicRoute */}
                <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />
                <Route path="/faq" element={<PublicRoute><Faq /></PublicRoute>} />
                <Route path="/contact" element={<PublicRoute><Contact /></PublicRoute>} />
                <Route path="/guides" element={<PublicRoute><Guides /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

                {/* Private Routes for any logged-in user */}
                <Route path="/dashboard" element={<PrivateRoute><LayoutLoginUser><Dashboard /></LayoutLoginUser></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><LayoutLoginUser><Profile /></LayoutLoginUser></PrivateRoute>} />
                <Route path="/training" element={<PrivateRoute><LayoutLoginUser><Training /></LayoutLoginUser></PrivateRoute>} />
                <Route path="/supplementation" element={<PrivateRoute><LayoutLoginUser><Supplementation /></LayoutLoginUser></PrivateRoute>} />
                <Route path="/blog" element={<PrivateRoute><LayoutLoginUser><Blog /></LayoutLoginUser></PrivateRoute>} />
                <Route path="/create-post" element={<PrivateRoute><LayoutLoginUser><CreatePost /></LayoutLoginUser></PrivateRoute>} />
                <Route path="/calculators" element={<PrivateRoute><LayoutLoginUser><Calculators /></LayoutLoginUser></PrivateRoute>} />
                <Route path="/consultations" element={<PrivateRoute><LayoutLoginUser><Consultations/></LayoutLoginUser></PrivateRoute>} />
                <Route path="/progress" element={<PrivateRoute><LayoutLoginUser><Progress/></LayoutLoginUser></PrivateRoute>} />

                {/* Trainer Private Routes */}
                <Route path="/trainer-dashboard" element={<PrivateRoute roleRequired={4}><TrainerLayout><TrainerDashboard /></TrainerLayout></PrivateRoute>} />
                <Route path="/trainer-materials" element={<PrivateRoute roleRequired={4}><TrainerLayout><EducationalMaterials /></TrainerLayout></PrivateRoute>} />
                <Route path="/trainer-workout-plans" element={<PrivateRoute roleRequired={4}><TrainerLayout><TrainingPlans /></TrainerLayout></PrivateRoute>} />
                <Route path="/trainer-supplement-plans" element={<PrivateRoute roleRequired={4}><TrainerLayout><SupplementPlans /></TrainerLayout></PrivateRoute>} />
                <Route path="/trainer-clients" element={<PrivateRoute roleRequired={4}><TrainerLayout><Clients /></TrainerLayout></PrivateRoute>} />
                <Route path="/trainer-progress" element={<PrivateRoute roleRequired={4}><TrainerLayout><ProgressTracking /></TrainerLayout></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
