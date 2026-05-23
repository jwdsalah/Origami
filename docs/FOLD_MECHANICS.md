# Fold Mechanics

## Overview

The fold mechanics system handles real-time detection of fold angles, calculation of fold progress, and visual feedback to guide players through each fold step.

## Core Concepts

### 1. Fold Angle Detection

The system supports two input methods:

#### Physical Fold (Android Foldable Devices)
- Direct hinge angle from device hardware
- Range: 0° (fully open) to 180° (fully closed)
- Real-time sensor updates (60+ Hz)
- High precision and natural feeling

#### Simulated Fold (Touch/Mouse)
- User-controlled angle via drag gestures
- Range: 0° to 180° based on drag direction
- Pressure/velocity can modulate angle change
- Works on all web browsers and Android

### 2. Angle Tolerance & Validation

Each fold step has:
- **Target Angle**: The desired fold angle (e.g., 90°)
- **Tolerance**: Acceptable variance (e.g., ±5°)
- **Valid Range**: Target ± Tolerance

```
Valid Range: 85° - 95° (target 90° ± 5°)

60°  70°  80°  |  85°  90°  95°  |  100° 110° 120°
              out of range    VALID    out of range
```

### 3. Progress Calculation

Progress is calculated based on proximity to target angle:

```typescript
deviation = Math.abs(currentAngle - targetAngle)
maxDeviation = 90° (maximum possible deviation)
progress = Math.max(0, 100 - (deviation / maxDeviation) * 100)
```

Examples:
- At target (90°): 100% progress
- 45° away: 50% progress
- 90° away: 0% progress

### 4. Fold Line Visibility

The fold line appears semi-transparent as the player approaches the correct angle:

```
Distance from target:
    0°-5°   (within tolerance)     → Opacity 100%
    5°-10°  (approaching)          → Opacity 50-100% (linear)
   10°-20°  (getting close)        → Opacity 10-50% (linear)
   20°+     (far away)             → Hidden (opacity 0%)
```

The fold line guides the player visually:
1. **Hidden**: Player is far from correct angle
2. **Faint**: Player is getting close
3. **Visible**: Player is very close
4. **Bright**: Player is at correct angle (±tolerance)

### 5. Fold Completion

A fold is considered complete when:
1. `currentAngle` is within tolerance of `targetAngle`
2. The correct angle is maintained for `holdDuration` (typically 500ms)
3. `progress` is ≥ 90%

This prevents accidental completions due to jitter.

## Fold Step Anatomy

Each fold step contains:

```typescript
interface FoldStep {
  id: string;                          // Unique identifier
  name: string;                        // Display name
  description: string;                 // User-friendly description
  targetAngle: number;                 // Target fold angle (0-180°)
  tolerance: number;                   // Angle variance allowed (±degrees)
  axis: 'x' | 'y' | 'z';              // Fold axis in 3D space
  foldLineStart: [number, number, number];  // 3D start point
  foldLineEnd: [number, number, number];    // 3D end point
  visualGuide?: string;                // Optional image/SVG reference
}
```

### Fold Axes Explained

- **X-Axis**: Left-right fold (horizontal line in 2D)
- **Y-Axis**: Top-bottom fold (vertical line in 2D)
- **Z-Axis**: Diagonal or complex fold (any angle in 2D)

## Visual Feedback System

### Color Indicators

```
State               Color       Opacity
────────────────────────────────────────
No fold detected    Gray        10%
Approaching target  Orange      30-70%
Within tolerance    Green       80%
Perfect angle       Bright Green 100%
```

### Progress Feedback

```
Progress Bar: Shows fold progress percentage
Opacity Scale: Fold line opacity matches distance to target
Particles: Emit when fold completes (celebration effect)
Haptic: Vibration on completion (if supported)
```

### Angle Display

```
Current: 87°
Target:  90°
Diff:    -3° ✓ (within ±5° tolerance)
```

## Angle Normalization

Angles are normalized to the 0-180° range:

```typescript
function normalizeAngle(angle) {
  let normalized = angle % 360;
  if (normalized < 0) normalized += 360;
  if (normalized > 180) normalized = 360 - normalized;
  return normalized;
}
```

This handles:
- Negative angles: -90° → 90°
- Large angles: 450° → 90°
- Wrap-around: 270° → 90°

## Smoothing & Jitter Reduction

Raw sensor input can be noisy. Smoothing is applied:

```typescript
smoothedAngle = currentAngle + 
                (targetAngle - currentAngle) * smoothingFactor

// smoothingFactor typically 0.05-0.15 (exponential smoothing)
```

This creates:
- Responsive but not jittery tracking
- Natural-feeling fold progression
- Reduced false completions

## Example: Paper Crane First Fold

```
Step: Diagonal Fold
Name: Fold the paper diagonally
Target Angle: 90°
Tolerance: ±5°

Sequence:
1. Player starts at 0° (flat paper)
   → Fold line is hidden

2. Player folds to 30°
   → Fold line barely visible (1% opacity)
   → Progress: ~67%

3. Player folds to 60°
   → Fold line is faint (30% opacity)
   → Progress: ~33%

4. Player folds to 87°
   → Fold line is bright (95% opacity)
   → Progress: ~96%
   → Within tolerance!

5. Player maintains 87-93° for 500ms
   → Fold completes!
   → Success animation
   → Transition to next step
```

## Error Handling

### Edge Cases

1. **No Input**: Fold line remains hidden, progress at 0%
2. **Wrong Axis**: Fold line invisible until correct axis movement
3. **Over-fold**: Angles > 180° are normalized down
4. **Jitter**: Smoothing prevents rapid oscillation
5. **Timeout**: Optional time limit for completing step

### Recovery

- No penalty for incomplete folds
- Players can always restart step
- Undo history available (future feature)

## Scoring System

Points based on:
```
accuracy = (tolerance - angleDeviation) / tolerance * 100
speed = basePoints * (1 - (timeUsed / maxTime))
consistency = (accurateFrames / totalFrames) * 100

totalPoints = accuracy + speed + consistency
```

## Performance Metrics

Tracked for player feedback:
- Accuracy percentage
- Average completion time per fold
- Total game completion time
- Consistency score
- Best fold award

## Future Enhancements

1. **Variable Tolerance**: Increase difficulty by reducing tolerance
2. **Multi-Fold Sequences**: Combine multiple folds simultaneously
3. **Physics Simulation**: Realistic paper bending behavior
4. **Force Feedback**: Haptic feedback matching fold resistance
5. **AR Overlay**: Real paper + digital guidance hybrid experience