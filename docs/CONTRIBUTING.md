# Contributing Guide

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/Origami.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Submit a pull request

## Development Setup

### Prerequisites
- Node.js 16+ (for web)
- Android Studio (for Android)
- Git
- TypeScript knowledge

### Installing Dependencies

```bash
# Web module
cd web
npm install

# Android module
cd android
# Open in Android Studio and sync Gradle
```

## Code Style

### TypeScript/JavaScript
- Use `const` by default, `let` when needed
- Type everything (no implicit `any`)
- Use meaningful variable names
- Max line length: 100 characters
- Use 2-space indentation

```typescript
// Good
const calculateProgress = (current: number, target: number): number => {
  return Math.max(0, Math.min(100, (current / target) * 100));
};

// Avoid
const calcProgress = (c, t) => Math.max(0, Math.min(100, (c / t) * 100));
```

### Kotlin (Android)
- Follow [Kotlin Style Guide](https://kotlinlang.org/docs/coding-conventions.html)
- Use meaningful names
- Prefer `data class` for simple data objects
- Use `sealed class` for type-safe enums

### File Organization

```
src/
├── components/     # React components
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── types/          # TypeScript interfaces
├── styles/         # CSS/SCSS files
└── tests/          # Test files (__tests__ or .test.ts)
```

## Adding a New Origami Shape

1. **Define the shape** in `shared/origami-shapes.ts`:

```typescript
export const myShape: OrigamiShape = {
  id: 'my-shape',
  name: 'My Shape',
  difficulty: 'easy',
  description: 'Shape description',
  steps: [
    {
      id: 'my-shape-1',
      name: 'Step 1',
      description: 'Step description',
      targetAngle: 90,
      tolerance: 5,
      axis: 'y',
      foldLineStart: [0, 0, 0],
      foldLineEnd: [100, 100, 0],
    },
    // ... more steps
  ],
};
```

2. **Export from barrel export**:
```typescript
// In origami-shapes.ts
export const ORIGAMI_SHAPES: OrigamiShape[] = [
  // ... existing shapes
  myShape,
];
```

3. **Test the shape** with all input methods
4. **Add thumbnail** (optional)
5. **Document** in shape details

## Git Workflow

### Commit Messages
```
feat: Add fold line visibility system
fix: Correct angle normalization edge case
docs: Update fold mechanics documentation
test: Add tests for FoldCalculator
refactor: Simplify geometry calculations
chore: Update dependencies
```

### Branch Naming
```
feature/fold-guidance
fix/angle-jitter
docs/architecture
test/geometry-utils
```

### Pull Request Process

1. Update your branch with latest main: `git rebase main`
2. Ensure all tests pass: `npm run test`
3. Build successfully: `npm run build`
4. Create PR with clear description
5. Address review feedback
6. Squash commits if requested

## Testing

### Running Tests

```bash
cd web
npm run test              # Run all tests
npm run test -- watch    # Run in watch mode
npm run test -- coverage # Generate coverage report
```

### Writing Tests

```typescript
describe('FoldCalculator', () => {
  test('should calculate correct fold state', () => {
    const state = FoldCalculator.calculateFoldState(90, 90, 5);
    expect(state.isCorrectAngle).toBe(true);
    expect(state.progress).toBeGreaterThan(90);
  });

  test('should show fold line when close to target', () => {
    const state = FoldCalculator.calculateFoldState(88, 90, 5);
    expect(state.foldLineVisible).toBe(true);
  });
});
```

## Documentation

- Update README.md for major changes
- Document public APIs with JSDoc comments
- Add architecture diagrams when relevant
- Keep fold mechanics documentation current

```typescript
/**
 * Calculates the fold state based on current angle and target
 * 
 * @param currentAngle - Current fold angle in degrees (0-180)
 * @param targetAngle - Target fold angle in degrees (0-180)
 * @param tolerance - Acceptable angle variance in degrees
 * @returns FoldState object with progress and feedback data
 * 
 * @example
 * const state = FoldCalculator.calculateFoldState(90, 90, 5);
 * console.log(state.progress); // High progress value
 */
static calculateFoldState(
  currentAngle: number,
  targetAngle: number,
  tolerance: number
): FoldState
```

## Performance Guidelines

1. Keep frame rate at 60 FPS
2. Minimize re-renders in React
3. Use memoization for expensive calculations
4. Optimize 3D geometry complexity
5. Profile with DevTools regularly

## Device Testing

### Android
- Test on actual foldable devices (Samsung Galaxy Z Fold/Flip)
- Test in emulator with simulated fold states
- Verify fold angle accuracy within ±2°
- Test fallback touch controls

### Web
- Test on Chrome, Firefox, Safari
- Test on mobile devices (iOS/Android)
- Test with mouse, touch, and keyboard
- Verify responsiveness at different screen sizes

## Issue Reporting

Include:
- Device/browser information
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos if applicable
- Error logs or stack traces

## Questions?

- Check existing issues/discussions
- Open a discussion for questions
- Reach out to maintainers

## License

By contributing, you agree your code is available under the MIT License.