import './Projects.css';
import { useState } from 'react';

function Projects() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Project 1",
      icon: "🎮",
      rarity: "legendary",
      description: "A detailed description of project 1 and its features.",
      technologies: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/yourusername/project1",
      demo: "https://project1-demo.com"
    },
    // Add more projects...
  ];

  return (
    <section id="projects">
      <h2 className="game-title">PROJECTS ARCHIVE</h2>
      {!gameStarted ? (
        <div className="game-menu">
          <button className="game-button" onClick={() => setGameStarted(true)}>
            OPEN INVENTORY
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
