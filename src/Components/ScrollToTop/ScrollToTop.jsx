import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

//elicon msh htkon mwgoda lma a3ml scrollDown 200px hyzhr button 
  const toggleVisibility = () => {
    if (window.pageYOffset > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

// lma a3ml onclick tsht8l
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    // flunmouting phase lma elcomponent ytshal
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const styles = {
    scrollButton: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#ff0000',
      color: 'white',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? 'visible' : 'hidden',
      transition: 'all 0.3s ease',
      zIndex: 1000,
      transform: isVisible ? 'scale(1)' : 'scale(0.7)',
    },
    icon: {
      fontSize: '24px',
    }
  };

  return (
    <>
      {isVisible && (
        <div 
          style={styles.scrollButton} 

          onClick={scrollToTop}
          title="Scroll to Top"
        >
          <FaArrowUp style={styles.icon} />
        </div>
      )}
    </>
  );
}