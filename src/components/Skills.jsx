import './Skills.css';
import { useEffect, useState } from 'react';

function Skills() {
  const [gameStarted, setGameStarted] = useState(false);
  const [character, setCharacter] = useState({ 
    x: 50, 
    y: 0,
    velocityX: 0,
    velocityY: 0,
    isJumping: false,
    width: 30,
    height: 30,
    direction: 1 // 1 for right, -1 for left
  });

  const MOVEMENT_SPEED = 0.8;
  const MAX_SPEED = 6;
  const FRICTION = 0.85;
  const GRAVITY = 0.5;
  const JUMP_FORCE = 15;

  const skills = [
    "JavaScript", "React", "CSS", "HTML", "Node.js",
    "Git", "GitHub", "MySQL", "Figma", "Arduino"
  ];

  const platformPositions = skills.map((skill, index) => ({
    name: skill,
    x: index % 2 === 0 ? 20 : 60,
    y: (index + 1) * 80
  }));

  const checkCollision = (charPos, platform) => {
    const charLeft = (charPos.x / 100) * window.innerWidth - (character.width / 2);
    const charRight = charLeft + character.width;
    const charBottom = charPos.y;
    const charTop = charPos.y + character.height;

    const platformLeft = (platform.x / 100) * window.innerWidth - 60; // half of platform width
    const platformRight = platformLeft + 120; // platform width
    const platformBottom = platform.y;
    const platformTop = platform.y + 10; // platform height

    return charRight > platformLeft &&
           charLeft < platformRight &&
           charBottom <= platformTop &&
           charBottom >= platformBottom;
  };

  useEffect(() => {
    if (!gameStarted) return;

    let gameLoop;
    const keysPressed = new Set();

    const handleKeyDown = (e) => {
      keysPressed.add(e.key);
      if (e.key === ' ') e.preventDefault();
    };

    const handleKeyUp = (e) => {
      keysPressed.delete(e.key);
    };

    const update = () => {
      setCharacter(prev => {
        let newVelocityX = prev.velocityX;
        let newVelocityY = prev.velocityY;
        let newDirection = prev.direction;

        // Horizontal movement
        if (keysPressed.has('ArrowLeft')) {
          newVelocityX -= MOVEMENT_SPEED;
          newDirection = -1;
        }
        if (keysPressed.has('ArrowRight')) {
          newVelocityX += MOVEMENT_SPEED;
          newDirection = 1;
        }

        // Apply friction
        if (!keysPressed.has('ArrowLeft') && !keysPressed.has('ArrowRight')) {
          newVelocityX *= FRICTION;
        }

        // Apply gravity
        newVelocityY -= GRAVITY;

        // Clamp velocities
        newVelocityX = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, newVelocityX));

        // Calculate new position
        let newX = prev.x + newVelocityX;
        let newY = prev.y + newVelocityY;

        // Check boundaries
        newX = Math.max(10, Math.min(90, newX));

        // Check platform collisions
        let isOnPlatform = false;
        for (const platform of platformPositions) {
          const nextPosition = { x: newX, y: newY };
          if (checkCollision(nextPosition, platform)) {
            if (prev.y > platform.y) { // Coming from above
              newY = platform.y + 10; // Place on top of platform
              newVelocityY = 0;
              isOnPlatform = true;
              break;
            }
          }
        }

        // Jumping
        if (keysPressed.has(' ') && (isOnPlatform || newY === 0)) {
          newVelocityY = JUMP_FORCE;
          isOnPlatform = false;
        }

        // Floor collision
        if (newY <= 0) {
          newY = 0;
          newVelocityY = 0;
          isOnPlatform = true;
        }

        return {
          ...prev,
          x: newX,
          y: newY,
          velocityX: newVelocityX,
          velocityY: newVelocityY,
          isJumping: !isOnPlatform,
          direction: newDirection
        };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    gameLoop = setInterval(update, 1000/60);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(gameLoop);
    };
  }, [gameStarted]);

  const handleExit = () => {
    setGameStarted(false);
    setCharacter({ x: 50, y: 0, velocityX: 0, velocityY: 0, isJumping: false, width: 30, height: 30, direction: 1 });
  };

  return (
    <section id="skills">
      <h2 className="game-title">SKILLS LEVEL</h2>
      {!gameStarted ? (
        <div className="game-menu">
          <button className="game-button" onClick={() => setGameStarted(true)}>
            PLAY
          </button>
        </div>
      ) : (
        <div className="game-container">
          <button className="exit-button" onClick={handleExit}>EXIT</button>
          <div className="floor"></div>
          <div 
            className="character" 
            style={{ 
              left: `${character.x}%`, 
              bottom: `${character.y}px`,
              transform: `translateX(-50%) scaleX(${character.direction})`
            }}
          >
            🚶
          </div>
          {platformPositions.map((platform, index) => (
            <div
              key={index}
              className="skill-platform"
              style={{
                left: `${platform.x}%`,
                bottom: `${platform.y}px`
              }}
            >
              {platform.name}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Skills;