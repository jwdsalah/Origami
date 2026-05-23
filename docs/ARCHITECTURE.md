# Architecture Overview

## System Design

### Three-Layer Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Platform Layer                         │
│  ┌──────────────────┐          ┌──────────────────────┐ │
│  │  Android Native  │          │   Web (Three.js)     │ │
│  │  (Kotlin, OpenGL)│          │  (TypeScript, React) │ │
│  └──────────────────┘          └──────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│               Game Logic Layer (Shared)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Origami      │  │ Fold         │  │ Geometry     │  │
│  │ Shapes       │  │ Calculator   │  │ Utilities    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                 Input Layer (Platform-Specific)          │
│  ┌──────────────────┐          ┌──────────────────────┐ │
│  │ Foldable API     │          │ Touch/Mouse + Device │ │
│  │ & Accelerometer  │          │ Orientation API      │ │
│  └──────────────────┘          └──────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Data Flow

### Fold Detection & Processing

```
Physical Fold / Touch Input
        ↓
Angle Detection (device API / touch tracking)
        ↓
FoldCalculator.calculateFoldState()
        ↓
FoldState {
  currentAngle,
  targetAngle,
  progress,
  isCorrectAngle,
  foldLineOpacity
}
        ↓
Renderer displays:
  - 3D paper with fold
  - Semi-transparent fold line
  - Progress feedback
  - Color indicators
```

### Game Flow

```
1. Player selects origami shape
2. Display first fold step with guidance
3. Wait for player input:
   - Physical fold (Android) OR
   - Touch/mouse drag (Web)
4. Detect fold angle in real-time
5. Show fold line when angle is correct
6. Complete step when held for threshold
7. Move to next step
8. Repeat until all steps complete
9. Show completion animation
10. Calculate score and display results
```

## State Management

### Game State

```typescript
interface GameState {
  currentShape: OrigamiShape;
  currentStepIndex: number;
  isGameActive: boolean;
  score: number;
  completionTime: number;
  foldHistory: FoldEvent[];
}
```

### Fold State

```typescript
interface FoldState {
  currentAngle: number;
  targetAngle: number;
  tolerance: number;
  progress: number;
  isCorrectAngle: boolean;
  foldLineVisible: boolean;
  foldLineOpacity: number;
}
```

## Component Responsibilities

### Shared (TypeScript/Game Logic)
- **origami-shapes.ts**: Defines all origami shapes and their fold sequences
- **fold-calculator.ts**: Calculates fold progress, angle validation, visual feedback
- **geometry.ts**: 3D math, matrix operations, paper geometry

### Android
- **FoldableDeviceManager**: Monitors fold state from hardware
- **OrigamiRenderer**: OpenGL rendering of 3D paper
- **GestureHandler**: Touch input processing
- **GameEngine**: Integrates all components

### Web
- **Canvas3D**: Three.js scene and rendering
- **FoldGuide**: Displays fold line and guidance
- **ProgressBar**: Visual feedback
- **Controls**: Touch and mouse input handling

## Input Handling

### Android - Foldable Device
1. Monitor `DisplayFeature` from `WindowManager`
2. Track hinge rotation angle (0-180°)
3. Map fold angle directly to paper fold angle
4. Use accelerometer for additional validation

### Android - Touch Fallback
1. Detect drag gestures
2. Calculate angle from drag direction
3. Apply same fold logic as device fold

### Web - Touch
1. Detect touch start/move/end
2. Calculate drag distance and angle
3. Apply to paper rotation
4. Multi-touch for pinch zoom

### Web - Mouse
1. Click and drag to rotate
2. Mouse wheel for zoom
3. Keyboard shortcuts for hints

## Rendering

### Android
- OpenGL ES 3.0
- Real-time paper mesh transformation
- Fold line rendering with shaders
- Particle effects for completion

### Web
- Three.js library
- WebGL backend
- Canvas 2D for UI overlay
- CSS for UI elements

## Performance Considerations

1. **Angle Smoothing**: Reduce jitter in fold input
2. **LOD (Level of Detail)**: Simplify geometry as needed
3. **Frame Rate**: Target 60 FPS
4. **Memory**: Optimize 3D mesh data
5. **Battery**: Minimize CPU/GPU usage when idle

## Testing Strategy

- Unit tests for fold calculations
- Integration tests for game flow
- Visual tests for rendering
- Device testing on actual foldable hardware
- Cross-browser testing for web

## Future Extensions

1. Multiplayer fold challenges
2. Custom origami creation
3. AR mode for real paper overlay
4. Haptic feedback integration
5. Advanced physics simulation