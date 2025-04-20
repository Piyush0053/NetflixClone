import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './TrendingSection.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Netflix trending content mock data
const trendingContent = [
  { id: 1, title: "Stranger Things", category: "Sci-Fi", image: "https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/a449fabb-05e4-4c8a-b062-b254b6399eb6/US-en-20240617-trifectadaily-perspective_alpha_website_small.jpg" },
  { id: 2, title: "The Crown", category: "Drama", image: "https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/e2d1c51e-d2e1-4861-88fc-edd7a65e4612/US-en-20240617-trifectadaily-perspective_alpha_website_small.jpg" },
  { id: 3, title: "Money Heist", category: "Action", image: "https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/b7780f4c-b0fb-4621-85af-0c8aa672ee04/US-en-20240617-trifectadaily-perspective_alpha_website_small.jpg" },
  { id: 4, title: "Squid Game", category: "Thriller", image: "https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/f554630d-d855-4e52-8ca1-3df3cfdf1eed/US-en-20240617-trifectadaily-perspective_alpha_website_small.jpg" },
  { id: 5, title: "Bridgerton", category: "Romance", image: "https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/6e3b5437-32c2-489b-850a-1a1ed12901c4/US-en-20240617-trifectadaily-perspective_alpha_website_small.jpg" }
];

const TrendingSection: React.FC = () => {
  const [showPreview, setShowPreview] = useState<number | null>(null);
  const trendingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (trendingRef.current) {
      ScrollTrigger.create({
        trigger: trendingRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo('.trending-title', 
            { opacity: 0, y: 10 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.4,
              clearProps: "transform"
            }
          );
          
          // Only animate visible cards to improve performance
          const cards = document.querySelectorAll('.trending-card');
          const visibleCards = Array.from(cards).slice(0, 6);
          
          gsap.fromTo(visibleCards, 
            { opacity: 0, y: 15 },
            { 
              opacity: 1, 
              y: 0, 
              stagger: 0.05,
              duration: 0.4,
              clearProps: "transform"
            }
          );
        },
        once: true
      });
    }
  }, []);

  const handleThumbnailHover = (id: number) => {
    setShowPreview(id);
    
    // Use will-change before animation
    const card = document.querySelector(`.trending-card[data-id="${id}"]`);
    if (card) {
      (card as HTMLElement).style.willChange = 'transform, box-shadow';
      
      gsap.to(card, {
        scale: 1.05,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        duration: 0.15,
        ease: "power2.out"
      });
    }
  };

  const handleThumbnailLeave = (id: number) => {
    setShowPreview(null);
    
    // Reset thumbnail animation
    const card = document.querySelector(`.trending-card[data-id="${id}"]`);
    if (card) {
      gsap.to(card, {
        scale: 1,
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        duration: 0.15,
        ease: "power2.out",
        onComplete: () => {
          // Clean up will-change
          (card as HTMLElement).style.willChange = 'auto';
        }
      });
    }
  };

  return (
    <motion.section 
      className="trending-section"
      ref={trendingRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="trending-title">Trending Now</h2>
      <div className="trending-grid">
        {trendingContent.map((item) => (
          <motion.div
            key={item.id}
            className="trending-card glass-effect"
            data-id={item.id}
            onMouseEnter={() => handleThumbnailHover(item.id)}
            onMouseLeave={() => handleThumbnailLeave(item.id)}
            whileHover={{ y: -10 }}
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="card-content">
              <h3>{item.title}</h3>
              <span className="category-badge">{item.category}</span>
              {showPreview === item.id && (
                <motion.div 
                  className="preview-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <button className="play-button">▶ Play</button>
                  <button className="info-button">ℹ More Info</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TrendingSection;