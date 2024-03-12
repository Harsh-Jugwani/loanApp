import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Register from "./components/Register";
import SignIn from "./components/SignIn";

import Dashboard from "./components/Dashboard";
import StatusPage from "./components/StatusPage";
import AdminPanel from "./components/AdminPanel";
import LoanRepayment from "./components/LoanRepayment";
axios.defaults.baseURL = "http://localhost:8000";


function App() {
  return (
    <div className="text-center">
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/pay" element={<LoanRepayment />} />
      </Routes>
    </div>
  );
}

export default App;
