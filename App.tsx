import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header, Footer, GrainOverlay } from './components/Layout';
import Home from './pages/Home';
import Collaborations from './pages/Collaborations';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import About from './pages/About';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-sand min-h-screen text-charcoal font-sans selection:bg-gold/30 overflow-x-hidden">
        <GrainOverlay />
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Collaborations />} />
          <Route path="/collaborations" element={<Collaborations />} /> {/* Keep for compatibility */}
          <Route path="/collaborations/:id" element={<ProjectDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<About />} /> {/* Redirect/Alias */}
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
