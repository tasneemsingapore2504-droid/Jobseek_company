import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/company/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CompanyLayout from "./components/CompanyLayout";
import CompanyProfile from "./pages/company/CompanyProfile";
import CompanyApplications from "./pages/company/Applications";
import InterviewForm from "./pages/company/Interview";
import CompanyJobs from "./pages/company/Jobs";
import CandidateProfiles from "./pages/company/CandidateProfiles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/company/dashboard" />} />

      <Route
        element={
          <ProtectedRoute>
            <CompanyLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/company/dashboard" element={<Dashboard />} />
        <Route path="/company/applications" element={<CompanyApplications />} />
        <Route path="/interview/:id" element={<InterviewForm />} />
        <Route path="/company/profile" element={<CompanyProfile />} />
        <Route path="/company/jobs" element={<CompanyJobs />} />
        <Route
          path="/company/candidate-profiles"
          element={<CandidateProfiles />}
        />
      </Route>

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
