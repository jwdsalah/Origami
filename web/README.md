# Web Module

Web-based implementation with 3D origami visualization and touch/mouse controls.

## Setup

```bash
cd web
npm install
npm run dev
```

## Architecture

- **Three.js**: 3D rendering engine
- **React**: UI framework
- **TypeScript**: Type-safe game logic
- **Touch/Mouse Events**: Input handling

## Key Features

1. **3D Paper Visualization**: Real-time 3D rendering of paper folds
2. **Fold Line Guidance**: Semi-transparent visual guides
3. **Touch Controls**: Drag to fold, pinch to zoom
4. **Progress Tracking**: Visual feedback during folding
5. **Responsive Design**: Works on desktop, tablet, and mobile

## File Structure

```
src/
├── components/
│   ├── Canvas3D.tsx
│   ├── FoldGuide.tsx
│   ├── ProgressBar.tsx
│   └── ShapeSelector.tsx
├── hooks/
│   ├── useFoldState.ts
│   ├── useTouchInput.ts
│   └── useDeviceOrientation.ts
├── utils/
│   ├── renderer.ts
│   └── controls.ts
└── App.tsx
```

## Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Browser Support

- Chrome/Edge (90+)
- Firefox (88+)
- Safari (14+)
- Mobile browsers with WebGL support