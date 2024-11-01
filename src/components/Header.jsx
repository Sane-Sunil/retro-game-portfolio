import './Header.css';
import { useRef, useEffect } from 'react';

function Header() {
  const navItems = useRef([]);

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

  return (
    <header onKeyDown={handleKeyDown}>
      <nav>
        <a href="header" ref={el => navItems.current[0] = el} onMouseEnter={() => handleMouseEnter(0)}>Home</a>
        <a href="#about" ref={el => navItems.current[1] = el} onMouseEnter={() => handleMouseEnter(1)}>About</a>
        <a href="#projects" ref={el => navItems.current[2] = el} onMouseEnter={() => handleMouseEnter(2)}>Projects</a>
        <a href="#skills" ref={el => navItems.current[3] = el} onMouseEnter={() => handleMouseEnter(3)}>Skills</a>
        <a href="#contact" ref={el => navItems.current[4] = el} onMouseEnter={() => handleMouseEnter(4)}>Contact</a>
      </nav>
    </header>
  );
}

export default Header;
