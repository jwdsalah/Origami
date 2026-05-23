# Origami Fold Game

An interactive origami folding game that leverages foldable phone hardware and web-based controls to simulate real paper folding. Players fold paper into origami shapes by either physically folding their device or using touch/mouse controls.

## Features

- 📱 **Foldable Device Support**: Real-time fold angle tracking on Android foldable devices
- 🌐 **Web-Based**: Responsive 3D origami visualization with touch and mouse controls
- 🎨 **Visual Guidance**: Semi-transparent fold lines appear when fold angle is correct
- 🎯 **Multiple Origami Shapes**: Start with classic shapes (crane, boat, butterfly, etc.)
- 📊 **Progress Tracking**: Track fold completion and scoring system

## Project Structure

```
Origami/
├── android/                 # Android module with foldable device support
│   ├── app/
│   ├── build.gradle
│   └── settings.gradle
├── web/                     # Web-based module with 3D visualization
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── shared/                  # Shared game logic and origami definitions
│   ├── origami-shapes.ts
│   ├── fold-calculator.ts
│   └── geometry.ts
├── docs/                    # Documentation and design specs
└── README.md
```

## Getting Started

### Android
```bash
cd android
./gradlew build
./gradlew installDebug
```

### Web
```bash
cd web
npm install
npm run dev
```

## Game Mechanics

1. **Fold Detection**: The fold angle directly corresponds to origami fold progress
2. **Fold Guidance**: Semi-transparent fold lines appear when rotation angle is correct
3. **Dual Input**:
   - Physical fold on foldable devices (Android)
   - Touch/mouse controls for web and fallback

## Supported Origami Shapes

- [ ] Paper Crane
- [ ] Paper Boat
- [ ] Butterfly
- [ ] Paper Airplane
- [ ] Jumping Frog

## Technology Stack

### Android
- Kotlin
- Jetpack Compose
- Android Foldable APIs
- OpenGL ES for 3D rendering

### Web
- TypeScript
- React/Three.js
- WebGL
- Touch and Mouse Event APIs

## License

MIT

## Contributing

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.
