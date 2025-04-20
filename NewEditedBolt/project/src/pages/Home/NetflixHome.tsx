import React, { useState, useEffect } from 'react';
import './NetflixHome.css';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import TrendingSection from '../../components/TrendingSection/TrendingSection';
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection';
import FAQSection from '../../components/FAQSection/FAQSection';
import Footer from '../../components/Footer/Footer';
import NetflixLoader from '../../components/NetflixLoader/NetflixLoader';
import { motion } from 'framer-motion';
import { useNavigate } from '../../hooks/useNavigate';

function NetflixHome() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [email, setEmail] = useState('');
  
  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle background image loading
  useEffect(() => {
    if (!isLoading) {
      const bgLoader = new Image();
      bgLoader.src = '/assets/images/background.webp';
      bgLoader.onload = () => {
        setBackgroundLoaded(true);
      };
      return () => {
        bgLoader.onload = null;
      };
    }
  }, [isLoading]);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('light-mode');
  };
  
  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    navigate('/netflix-show');
  };
  
  if (isLoading) {
    return <NetflixLoader />;
  }
  
  return (
    <motion.div 
      className={`main ${darkMode ? 'dark-theme' : 'light-theme'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Homepage Background */}
      <div className={`homepage-background ${backgroundLoaded ? 'loaded' : ''}`}>
        {window.location.pathname === '/' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="background-overlay"
          >
            <img 
              src="/assets/images/background.webp" 
              alt=""
              loading="lazy"
              className="background-image"
            />
          </motion.div>
        )}
      </div>
      
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        navigate={navigate}
      />
      
      <Hero 
        email={email}
        onEmailChange={handleEmailChange}
        onEmailSubmit={handleEmailSubmit}
      />
      
      <div className="separation"></div>
      <TrendingSection />
      
      <div className="separation"></div>
      <FeaturesSection />
      
      <div className="separation"></div>
      <FAQSection 
        email={email}
        onEmailChange={handleEmailChange}
        onEmailSubmit={handleEmailSubmit}
      />
      
      <div className="separation"></div>
      <Footer />
    </motion.div>
  );
}

export default NetflixHome;