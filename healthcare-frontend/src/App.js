import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StaffLogin from "./pages/StaffLogin";
import PatientLogin from "./pages/PatientLogin";
import Dashboard from "./pages/Dashboard";
import PatientDashboard from "./pages/PatientDashboard";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home with login options */}
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Staff Dashboard */}
        <Route path="/patient-dashboard/:patientID" element={<PatientDashboard />} /> {/* Individual Patient Dashboard */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
