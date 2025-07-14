# Brick Breaker Game

A modern web-based implementation of the classic Brick Breaker game built with React, TypeScript, and HTML5 Canvas.

## 🎮 Game Features

- **Classic Gameplay**: Break bricks by bouncing a ball with a paddle
- **Responsive Controls**: Mouse movement and keyboard controls (Arrow keys, A/D)
- **Game States**: Start screen, pause functionality, game over, and win conditions
- **Scoring System**: Different colored bricks award different points
- **Smooth Physics**: Realistic ball movement and collision detection
- **Mobile Ready**: Touch-responsive design for mobile devices

## 🚀 Technologies Used

- **React 18** with TypeScript for component-based architecture
- **HTML5 Canvas** for high-performance game rendering
- **Tailwind CSS** for responsive styling
- **Vitest** for comprehensive testing
- **Vite** for fast development and building

## 🎯 Game Controls

- **Mouse**: Move paddle left and right
- **Keyboard**: Arrow keys or A/D keys to move paddle
- **Space/Enter**: Launch ball or start game
- **P**: Pause/unpause game

## 🏗️ Architecture

The game follows SOLID principles with a modular, extensible architecture:

### Core Components

- `GameEngine`: Main game logic and state management
- `Canvas`: Rendering component for game objects
- `GameHeader`: Displays score
- `GameMenu`: Game state controls and overlays

### Game Entities

- `Ball`: Physics-based ball with collision detection
- `Paddle`: Player-controlled paddle with bounds checking
- `Brick`: Destructible brick objects with scoring

### Utilities

- `physics`: Collision detection and ball physics
- `brickGenerator`: Brick layout and scoring logic
- Custom hooks for game loop, keyboard, and mouse input

## 🧪 Testing

The game includes comprehensive test coverage:

```bash
pnpm run test        # Run tests
pnpm run test:ui     # Run tests with UI
```

Tests cover:
- Physics calculations and collision detection
- Brick generation and scoring logic
- Game state transitions
- Component rendering

## 🎨 Game Configuration

All game parameters are centralized in `constants/gameConfig.ts`:

- Canvas dimensions (800x600px, responsive)
- Ball physics (speed, radius, collision behavior)
- Paddle properties (size, speed, positioning)
- Brick layout (rows, columns, colors, scoring)

## 🔧 Development

```bash
pnpm install         # Install dependencies
pnpm run dev         # Start development server
pnpm run build       # Build for production
pnpm run preview     # Preview production build
```

## 🚀 Deployment

The game is configured for GitHub Pages deployment:

```bash
pnpm run deploy      # Deploy to GitHub Pages
```

## 🎯 Extensibility

The architecture supports easy extension for:

- **Power-ups**: Multi-ball, paddle resize, sticky ball

- **Sound effects**: Audio feedback for collisions and events
- **Local storage**: High score persistence
- **Mobile gestures**: Touch and swipe controls
- **Visual effects**: Particle systems and animations

## 🎮 Game Rules

1. **Objective**: Destroy all bricks by hitting them with the ball
2. **Scoring**: 
   - Red bricks: 10 points
   - Orange bricks: 20 points
   - Green bricks: 30 points
3. **Win**: Clear all bricks to win the game.
4. **Game Over**: The game ends if the ball falls below the paddle.

## 📱 Browser Support

- Modern browsers with HTML5 Canvas support
- Mobile browsers with touch events
- Responsive design for various screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

MIT License - feel free to use this code for your own projects!