# Android Module

Native Android implementation with support for foldable devices.

## Setup

```bash
cd android
./gradlew build
./gradlew installDebug
```

## Architecture

- **FoldableDeviceManager**: Detects fold state and hinge angle
- **OrigamiRenderer**: OpenGL ES 3D rendering
- **GestureHandler**: Touch input for alternative fold input
- **GameEngine**: Core game logic integration

## Foldable Device Support

Uses Android's `WindowManager` APIs to:
- Detect device fold state (open/folded)
- Get real-time hinge angle
- Adapt UI to fold configuration
- Track device orientation changes

## Key Classes

- `FoldableActivity.kt`: Main activity with fold awareness
- `OrigamiSurfaceView.kt`: Custom surface view for 3D rendering
- `FoldStateManager.kt`: Manages fold state and angles
- `GestureDetector.kt`: Handles touch input for folding simulation