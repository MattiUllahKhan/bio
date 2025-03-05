import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Header from './components/Header';
import BackButton from './components/BackCourses';
import Spacer from './components/Spacer';
import HomePage from './components/HomePage';
import News from './components/News';
import NewsDetails from './components/NewsDetails';
import NotFound from './components/NotFound';
import MattiUllahKhanNiazi from './components/MattiUllahKhanNiazi';
import CgpaCalculator from './components/gpa-and-cgpa-calculator';

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
  </div>
);

const PageWrapper = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading time
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="relative">
      {/* Loader only inside the Routes wrapper */}
      {loading && (
        <div className="absolute top-24 bottom-24 inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}
      
      <div className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
        {children}
      </div>
    </div>
  );
};


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <HelmetProvider>
      <Router>
        {/* Keep Header outside PageWrapper so it's not affected by the loader */}
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Wrap only Routes inside PageWrapper */}
        <div className="relative">
          <PageWrapper>
            <Routes>
              <Route path="/" element={<><Spacer/><HomePage /></>} />
              <Route path="/courses" element={<><Spacer /><BackButton/><Courses /></>} />
              <Route path="/course/:courseId" element={<><Spacer /><BackButton/><CourseDetail /></>} />
              <Route path="/news" element={<><Spacer /><BackButton/><News/></>} />
              <Route path="/news/:courseId" element={<><Spacer /><BackButton/><NewsDetails /></>} />
              <Route path="*" element={<><Spacer /><BackButton/><NotFound /></>} />
              <Route path="/user1" element={<><Spacer /><BackButton/><MattiUllahKhanNiazi/></>} />
              <Route path="/gpa-and-cgpa-calculator" element={<><Spacer /><BackButton/><CgpaCalculator /></>} />
            </Routes>
          </PageWrapper>
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
