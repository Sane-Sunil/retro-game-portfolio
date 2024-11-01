import './Projects.css';
import { useState } from 'react';

function Projects() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Personal-weather-data",
      icon: "☀️",
      rarity: "legendary",
      description: "Collects weather data from a esp with dht11 sensor and displays it in a React app.",
      technologies: ["React", "Node.js", "Arduino"],
      github: "https://github.com/Sane-Sunil/Personal-weather-data",
      demo: "https://personal-weather-data.onrender.com/"
    },
    {
      id: 2,
      title: "Profile",
      icon: "👦",
      rarity: "common",
      description: "A profile website to showcase my skills and projects.",
      technologies: ["html", "css", "js"],
      github: "https://github.com/Sane-Sunil/Profile",
      demo: "https://sane-sunil.netlify.app/"
    }
    {
      id: 3,
      title: "To-do",
      icon: "📃",
      rarity: "rare",
      description: "A to-do list app to manage your tasks. It stores data on local storage.",
      technologies: ["Node.js", "React"],
      github: "https://github.com/Sane-Sunil/to-do",
      demo: ""
    }
  ];

  return (
    <section id="projects">
      <h2 className="game-title">PROJECTS ARCHIVE</h2>
      {!gameStarted ? (
        <div className="game-menu">
          <button className="game-button" onClick={() => setGameStarted(true)}>
            INVENTORY
          </button>
        </div>
      ) : (
        <div className="minecraft-inventory">
          <button className="exit-button" onClick={() => setGameStarted(false)}>EXIT</button>
          <div className="inventory-grid">
            {Array(9).fill(null).map((_, index) => {
              const project = projects[index];
              return (
                <div 
                  key={index} 
                  className={`inventory-slot ${selectedSlot === index ? 'selected' : ''} ${project?.rarity || ''}`}
                  onClick={() => setSelectedSlot(selectedSlot === index ? null : index)}
                >
                  {project && (
                    <>
                      <span className="project-icon">{project.icon}</span>
                      {selectedSlot === index && (
                        <div className="project-tooltip">
                          <h3>{project.title}</h3>
                          <p>{project.description}</p>
                          <div className="tech-stack">
                            {project.technologies.map((tech, i) => (
                              <span key={i} className="tech-tag">{tech}</span>
                            ))}
                          </div>
                          <div className="project-links">
                            <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">Demo</a>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
