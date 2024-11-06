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
    direction: 1
  });

  const KEYBOARD_MOVEMENT_SPEED = 0.4;
  const TOUCH_MOVEMENT_SPEED = 0.4;
  const KEYBOARD_MAX_SPEED = 4;
  const TOUCH_MAX_SPEED = 4;
  const FRICTION = 0.9;
  const GRAVITY = 0.3;
  const JUMP_FORCE = 12;

  const skills = [
    "JavaScript", "React", "CSS", "HTML", "Node.js",
    "Git", "GitHub", "MySQL", "Figma", "Arduino"
  ];

  const platformPositions = skills.map((skill, index) => ({
    name: skill,
    x: index % 2 === 0 ? 35 : 65,
    y: (index + 1) * 150
  }));

  const checkCollision = (charPos, platform) => {
    const platformWidth = 120;
    const platformHeight = 40;

    const charLeft = (charPos.x / 100) * window.innerWidth - (character.width / 2);
    const charRight = charLeft + character.width;
    const charBottom = charPos.y;
    const charTop = charPos.y + character.height;

    const platformLeft = (platform.x / 100) * window.innerWidth - (platformWidth / 2);
    const platformRight = platformLeft + platformWidth;
    const platformBottom = platform.y;
    const platformTop = platform.y + platformHeight;

    return charRight > platformLeft &&
           charLeft < platformRight &&
           charBottom < platformTop &&
           charTop > platformBottom;
  };

  const [cameraY, setCameraY] = useState(0);

  useEffect(() => {
    if (gameStarted) {
      const viewportHeight = window.innerHeight * 0.8;
      const worldPosition = character.y - (viewportHeight * 0.3);
      setCameraY(-worldPosition);
    } else {
      setCameraY(0);
    }
  }, [character.y, gameStarted]);

  const [touchStart, setTouchStart] = useState(null);
  const [isTouching, setIsTouching] = useState(false);
  const [touchVelocityX, setTouchVelocityX] = useState(0);

  const [isLeftPressed, setIsLeftPressed] = useState(false);
  const [isRightPressed, setIsRightPressed] = useState(false);

  useEffect(() => {
    if (!gameStarted) return;

    let gameLoop;
    const keysPressed = new Set();

    const handleKeyDown = (e) => {
      keysPressed.add(e.key);
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        setCharacter(prev => {
          if (!prev.isJumping) {
            return {
              ...prev,
              velocityY: JUMP_FORCE,
              isJumping: true
            };
          }
          return prev;
        });
      }
    };

    const handleKeyUp = (e) => {
      keysPressed.delete(e.key);
    };

    // Touch controls
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      setTouchStart(touch.clientX);
      setIsTouching(true);
    };

    const handleTouchMove = (e) => {
      if (!touchStart) return;
      
      const touch = e.touches[0];
      const diff = touch.clientX - touchStart;
      
      // Convert touch movement to velocity
      setTouchVelocityX(diff * 0.05);
      setTouchStart(touch.clientX);
    };

    const handleTouchEnd = () => {
      setTouchStart(null);
      setIsTouching(false);
      setTouchVelocityX(0);
    };

    // Jump on tap
    const handleTap = (e) => {
      e.preventDefault();
      if (e.touches.length === 2) { // Two finger tap to jump
        setCharacter(prev => {
          if (!prev.isJumping) {
            return {
              ...prev,
              velocityY: JUMP_FORCE,
              isJumping: true
            };
          }
          return prev;
        });
      }
    };

    const update = () => {
      setCharacter(prev => {
        let newVelocityX = prev.velocityX;
        let newVelocityY = prev.velocityY;
        let newDirection = prev.direction;
        let isJumping = prev.isJumping;

        // Handle both keyboard and touch controls with same physics
        if (keysPressed.has('ArrowLeft') || isLeftPressed) {
          newVelocityX -= TOUCH_MOVEMENT_SPEED;
          newDirection = 1;
        }
        if (keysPressed.has('ArrowRight') || isRightPressed) {
          newVelocityX += TOUCH_MOVEMENT_SPEED;
          newDirection = -1;
        }

        // Apply friction when no input
        if (!keysPressed.has('ArrowLeft') && !keysPressed.has('ArrowRight') && !isLeftPressed && !isRightPressed) {
          newVelocityX *= FRICTION;
        }

        newVelocityY -= GRAVITY;

        // Clamp velocity
        newVelocityX = Math.max(-TOUCH_MAX_SPEED, Math.min(TOUCH_MAX_SPEED, newVelocityX));

        let newX = prev.x + (newVelocityX * 0.3);
        let newY = prev.y + (newVelocityY * 0.8);

        // Clamp position
        newX = Math.max(10, Math.min(90, newX));

        // Platform collision detection
        let isOnPlatform = false;
        for (const platform of platformPositions) {
          if (checkCollision({ x: newX, y: newY }, platform)) {
            if (prev.velocityY <= 0) {  // Only if falling
              newY = platform.y + character.height;
              newVelocityY = 0;
              isOnPlatform = true;
              isJumping = false;
            }
          }
        }

        // Floor collision
        if (newY <= 0) {
          newY = 0;
          newVelocityY = 0;
          isJumping = false;
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

    // Add touch event listeners
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
      gameContainer.addEventListener('touchstart', handleTouchStart);
      gameContainer.addEventListener('touchmove', handleTouchMove);
      gameContainer.addEventListener('touchend', handleTouchEnd);
      gameContainer.addEventListener('touchstart', handleTap);
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    gameLoop = setInterval(update, 1000/60);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(gameLoop);
      if (gameContainer) {
        gameContainer.removeEventListener('touchstart', handleTouchStart);
        gameContainer.removeEventListener('touchmove', handleTouchMove);
        gameContainer.removeEventListener('touchend', handleTouchEnd);
        gameContainer.removeEventListener('touchstart', handleTap);
      }
    };
  }, [gameStarted, isLeftPressed, isRightPressed]);

  const handleExit = () => {
    setGameStarted(false);
    setCharacter({ 
      x: 50, 
      y: 0,
      velocityX: 0,
      velocityY: 0,
      isJumping: false,
      width: 30,
      height: 30,
      direction: 1
    });
    setIsLeftPressed(false);
    setIsRightPressed(false);
  };

  const handleJump = () => {
    setCharacter(prev => {
      if (!prev.isJumping) {
        return {
          ...prev,
          velocityY: JUMP_FORCE,
          isJumping: true
        };
      }
      return prev;
    });
  };

  const TOUCH_MOVEMENT_AMOUNT = 15; // Amount to move per button press

  const handleMobileMove = (direction) => {
    setCharacter(prev => {
      const newX = prev.x + (direction * TOUCH_MOVEMENT_AMOUNT);
      // Clamp the position between 10 and 90
      const clampedX = Math.max(10, Math.min(90, newX));
      
      return {
        ...prev,
        x: clampedX,
        direction: direction > 0 ? -1 : 1 // Set character direction
      };
    });
  };

  useEffect(() => {
    // Prevent default touch behavior for the entire game container
    const preventDefaultTouch = (e) => {
      if (e.target.closest('.control-btn')) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', preventDefaultTouch, { passive: false });
    
    return () => {
      document.removeEventListener('touchstart', preventDefaultTouch);
    };
  }, []);

  return (
    <section id="skills">
      <div className="skills  _div">
      <h2 className="game-title">SKILL HEIGHTS</h2>
      {!gameStarted ? (
        <div className="game-menu">
          <div className="game-instructions">
            <button className="game-button" onClick={() => setGameStarted(true)}>
              PLAY
            </button>
            <div className="control-instructions">
              <div className="keyboard-instructions">
                <h3>Keyboard Controls</h3>
                <p>• Left/Right Arrow - Move</p>
                <p>• Space/Up Arrow - Jump</p>
                <p>• Exit Button - Exit Game</p>
              </div>
              <div className="touch-instructions">
                <h3>Mobile Controls</h3>
                <p>• Left/Right Buttons - Move</p>
                <p>• Jump Button - Jump</p>
                <p>• Exit Button - Exit Game
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button 
            className="exit-button" 
            onClick={handleExit}
            aria-label="Exit game"
          >
            EXIT
          </button>
          <div className="game-container">
            <div 
              className="game-world"
              style={{
                transform: `translateY(${-cameraY}px)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
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
            
            <div className="mobile-controls">
              <div className="direction-controls">
                <button 
                  className="control-btn"
                  onTouchStart={() => setIsLeftPressed(true)}
                  onTouchEnd={() => setIsLeftPressed(false)}
                  onMouseDown={() => setIsLeftPressed(true)}
                  onMouseUp={() => setIsLeftPressed(false)}
                  onMouseLeave={() => setIsLeftPressed(false)}
                >
                  ←
                </button>
                <button 
                  className="control-btn"
                  onTouchStart={() => setIsRightPressed(true)}
                  onTouchEnd={() => setIsRightPressed(false)}
                  onMouseDown={() => setIsRightPressed(true)}
                  onMouseUp={() => setIsRightPressed(false)}
                  onMouseLeave={() => setIsRightPressed(false)}
                >
                  →
                </button>
              </div>
              <div className="jump-control">
                <button 
                  className="control-btn jump-btn"
                  onClick={handleJump}
                  onTouchStart={handleJump}
                >
                  JUMP
                </button>
              </div>
            </div>
          </div>
        </>
      )}</div>
    </section>
  );
}

export default Skills;