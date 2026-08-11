import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RepoAnalysisPage from './pages/RepoAnalysisPage';
import RepoAnalysisPageAlt from './pages/RepoAnalysisPageAlt';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analysis" element={<RepoAnalysisPage />} />
        <Route path="/analysis-alt" element={<RepoAnalysisPageAlt />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
