import './Header.css';
import { useRef, useState, useEffect } from 'react';

function Header() {
  const navItems = useRef([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (navItems.current[0]) {
      navItems.current[0].focus();
    }
  }, []);

  const handleKeyDown = (event) => {
    const { key } = event;
    const currentIndex = navItems.current.findIndex(item => item === document.activeElement);

    if (key === 'Tab') {
      event.preventDefault();
      if (event.shiftKey) {
        const prevIndex = (currentIndex - 1 + navItems.current.length) % navItems.current.length;
        navItems.current[prevIndex].focus();
      } else {
        const nextIndex = (currentIndex + 1) % navItems.current.length;
        navItems.current[nextIndex].focus();
      }
    } else if (key === 'Escape') {
      setIsMenuOpen(false);
      if (navItems.current[currentIndex]) {
        navItems.current[currentIndex].blur();
      }
    }
  };

  const handleMouseEnter = (index) => {
    if (navItems.current[index]) {
      navItems.current[index].blur();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header onKeyDown={handleKeyDown}>
      <button 
        className={`menu-button ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <span className="menu-icon">⚔️</span>
      </button>

      <nav className={isMenuOpen ? 'active' : ''}>
        <a 
          href="#home" 
          ref={el => navItems.current[0] = el} 
          onMouseEnter={() => handleMouseEnter(0)}
          onClick={handleClick}
        >
          Home
        </a>
        <a 
          href="#about" 
          ref={el => navItems.current[1] = el} 
          onMouseEnter={() => handleMouseEnter(1)}
          onClick={handleClick}
        >
          About Me
        </a>
        <a 
          href="#skills" 
          ref={el => navItems.current[2] = el} 
          onMouseEnter={() => handleMouseEnter(2)}
          onClick={handleClick}
        >
          Skill Heights
        </a>
        <a 
          href="#projects" 
          ref={el => navItems.current[3] = el} 
          onMouseEnter={() => handleMouseEnter(3)}
          onClick={handleClick}
        >
          Projects Archive
        </a>
        <a 
          href="#contact" 
          ref={el => navItems.current[4] = el} 
          onMouseEnter={() => handleMouseEnter(4)}
          onClick={handleClick}
        >
          Contact Me
        </a>
        
        <div className={`nav-exit-container ${isMenuOpen ? 'active' : ''}`}>
          <span className="nav-exit-text">Return To Conquest</span>
          <button 
            className="nav-exit-btn"
            onClick={handleClick}
            aria-label="Close menu"
          >
            OK
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
