import './About.css';
import { useEffect, useState, useCallback } from 'react';

function About() {
  const texts = [
    "I'm 19 years old.",
    "Web developer.",
    "IoT enthusiast.",
    "Project manager at Inovus Labs, IEDC.",
    "Gamer."
  ];
  
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typeText = useCallback(() => {
    const currentText = texts[currentIndex];
    
    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayText, currentIndex, isDeleting, texts]);

  useEffect(() => {
    const cleanup = typeText();
    return () => cleanup && cleanup();
  }, [typeText]);

  return (
    <section id="about">
      <div className="about-content">
        <h2 className="glowing-text heading">About Me</h2>
        <div className="info_div_main">
          <div className="text-container info-box">
            <p className="typing-text">{displayText}<span className="blinker">_</span></p>
          </div>
          <div className="additional-info">
            <div className="info-box">
              <h3>Education</h3>
              <p>Pursuing BCA</p>
              <p>Kristu Jyoti College of Management and Technology, Changanacherry</p>
            </div>
            <div className="info-box">
              <h3>Experience</h3>
              <p>Project Manager at Inovus Labs IEDC</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
