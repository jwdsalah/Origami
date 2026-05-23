/**
 * Origami Shape Definitions
 * Defines the sequence of folds required for each origami shape
 */

export interface FoldStep {
  id: string;
  name: string;
  description: string;
  targetAngle: number; // Target fold angle in degrees (0-180)
  tolerance: number; // Acceptable angle variance in degrees
  axis: 'x' | 'y' | 'z'; // Fold axis
  foldLineStart: [number, number, number]; // 3D coordinates
  foldLineEnd: [number, number, number];
  visualGuide?: string; // SVG or image path for visual guidance
}

export interface OrigamiShape {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  steps: FoldStep[];
  description: string;
  thumbnail?: string;
}

// Paper Crane - Classic origami shape
export const paperCrane: OrigamiShape = {
  id: 'crane',
  name: 'Paper Crane',
  difficulty: 'medium',
  description: 'Create a beautiful paper crane in 8 folds',
  steps: [
    {
      id: 'crane-1',
      name: 'Diagonal Fold',
      description: 'Fold the paper diagonally to create a triangle',
      targetAngle: 90,
      tolerance: 5,
      axis: 'z',
      foldLineStart: [0, 0, 0],
      foldLineEnd: [100, 100, 0],
    },
    {
      id: 'crane-2',
      name: 'Reverse Fold',
      description: 'Fold the triangle in half',
      targetAngle: 90,
      tolerance: 5,
      axis: 'x',
      foldLineStart: [50, 0, 0],
      foldLineEnd: [50, 100, 0],
    },
    {
      id: 'crane-3',
      name: 'Wing Fold',
      description: 'Create the wing by folding down',
      targetAngle: 45,
      tolerance: 5,
      axis: 'y',
      foldLineStart: [0, 50, 0],
      foldLineEnd: [100, 50, 0],
    },
    {
      id: 'crane-4',
      name: 'Opposite Wing',
      description: 'Fold the opposite wing',
      targetAngle: 45,
      tolerance: 5,
      axis: 'y',
      foldLineStart: [0, 50, 0],
      foldLineEnd: [100, 50, 0],
    },
    {
      id: 'crane-5',
      name: 'Neck Fold',
      description: 'Create the neck of the crane',
      targetAngle: 70,
      tolerance: 5,
      axis: 'z',
      foldLineStart: [40, 80, 0],
      foldLineEnd: [60, 80, 0],
    },
    {
      id: 'crane-6',
      name: 'Head Fold',
      description: 'Fold the head',
      targetAngle: 30,
      tolerance: 5,
      axis: 'z',
      foldLineStart: [50, 90, 0],
      foldLineEnd: [50, 100, 0],
    },
    {
      id: 'crane-7',
      name: 'Tail Fold',
      description: 'Create the tail',
      targetAngle: 70,
      tolerance: 5,
      axis: 'z',
      foldLineStart: [40, 20, 0],
      foldLineEnd: [60, 20, 0],
    },
    {
      id: 'crane-8',
      name: 'Final Shape',
      description: 'Shape the crane wings',
      targetAngle: 120,
      tolerance: 5,
      axis: 'x',
      foldLineStart: [30, 50, 0],
      foldLineEnd: [70, 50, 0],
    },
  ],
};

// Paper Boat - Simple origami
export const paperBoat: OrigamiShape = {
  id: 'boat',
  name: 'Paper Boat',
  difficulty: 'easy',
  description: 'Create a simple paper boat in 4 folds',
  steps: [
    {
      id: 'boat-1',
      name: 'First Diagonal',
      description: 'Fold paper diagonally',
      targetAngle: 90,
      tolerance: 5,
      axis: 'z',
      foldLineStart: [0, 0, 0],
      foldLineEnd: [100, 100, 0],
    },
    {
      id: 'boat-2',
      name: 'Second Diagonal',
      description: 'Fold other corner diagonally',
      targetAngle: 90,
      tolerance: 5,
      axis: 'z',
      foldLineStart: [100, 0, 0],
      foldLineEnd: [0, 100, 0],
    },
    {
      id: 'boat-3',
      name: 'Open and Fold',
      description: 'Open and fold in half',
      targetAngle: 90,
      tolerance: 5,
      axis: 'y',
      foldLineStart: [50, 0, 0],
      foldLineEnd: [50, 100, 0],
    },
    {
      id: 'boat-4',
      name: 'Final Shape',
      description: 'Complete the boat shape',
      targetAngle: 45,
      tolerance: 5,
      axis: 'x',
      foldLineStart: [0, 50, 0],
      foldLineEnd: [100, 50, 0],
    },
  ],
};

// Paper Butterfly
export const paperButterfly: OrigamiShape = {
  id: 'butterfly',
  name: 'Paper Butterfly',
  difficulty: 'medium',
  description: 'Create a delicate paper butterfly',
  steps: [
    {
      id: 'butterfly-1',
      name: 'Base Fold',
      description: 'Fold paper in half',
      targetAngle: 90,
      tolerance: 5,
      axis: 'y',
      foldLineStart: [50, 0, 0],
      foldLineEnd: [50, 100, 0],
    },
    {
      id: 'butterfly-2',
      name: 'Wing Fold 1',
      description: 'Create first wing',
      targetAngle: 45,
      tolerance: 5,
      axis: 'z',
      foldLineStart: [25, 50, 0],
      foldLineEnd: [50, 50, 0],
    },
    {
      id: 'butterfly-3',
      name: 'Wing Fold 2',
      description: 'Create second wing',
      targetAngle: 45,
      tolerance: 5,
      axis: 'z',
      foldLineStart: [50, 50, 0],
      foldLineEnd: [75, 50, 0],
    },
  ],
};

// Paper Airplane
export const paperAirplane: OrigamiShape = {
  id: 'airplane',
  name: 'Paper Airplane',
  difficulty: 'easy',
  description: 'Create a classic paper airplane',
  steps: [
    {
      id: 'airplane-1',
      name: 'Diagonal Fold',
      description: 'Fold top corners diagonally',
      targetAngle: 45,
      tolerance: 5,
      axis: 'z',
      foldLineStart: [50, 0, 0],
      foldLineEnd: [0, 50, 0],
    },
    {
      id: 'airplane-2',
      name: 'Second Fold',
      description: 'Fold again diagonally',
      targetAngle: 45,
      tolerance: 5,
      axis: 'z',
      foldLineStart: [50, 0, 0],
      foldLineEnd: [100, 50, 0],
    },
    {
      id: 'airplane-3',
      name: 'Fold in Half',
      description: 'Fold paper in half vertically',
      targetAngle: 90,
      tolerance: 5,
      axis: 'y',
      foldLineStart: [50, 0, 0],
      foldLineEnd: [50, 100, 0],
    },
    {
      id: 'airplane-4',
      name: 'Wing Fold',
      description: 'Create wings',
      targetAngle: 90,
      tolerance: 5,
      axis: 'z',
      foldLineStart: [0, 30, 0],
      foldLineEnd: [100, 30, 0],
    },
  ],
};

// Jumping Frog
export const jumpingFrog: OrigamiShape = {
  id: 'frog',
  name: 'Jumping Frog',
  difficulty: 'hard',
  description: 'Create a frog that can jump',
  steps: [
    {
      id: 'frog-1',
      name: 'Initial Fold',
      description: 'Fold paper diagonally',
      targetAngle: 90,
      tolerance: 5,
      axis: 'z',
      foldLineStart: [0, 0, 0],
      foldLineEnd: [100, 100, 0],
    },
    {
      id: 'frog-2',
      name: 'Rectangle Fold',
      description: 'Fold into rectangle',
      targetAngle: 90,
      tolerance: 5,
      axis: 'y',
      foldLineStart: [50, 0, 0],
      foldLineEnd: [50, 100, 0],
    },
    {
      id: 'frog-3',
      name: 'Leg Fold 1',
      description: 'Create first leg',
      targetAngle: 45,
      tolerance: 5,
      axis: 'z',
      foldLineStart: [0, 70, 0],
      foldLineEnd: [50, 70, 0],
    },
    {
      id: 'frog-4',
      name: 'Leg Fold 2',
      description: 'Create second leg',
      targetAngle: 45,
      tolerance: 5,
      axis: 'z',
      foldLineStart: [50, 70, 0],
      foldLineEnd: [100, 70, 0],
    },
  ],
};

export const ORIGAMI_SHAPES: OrigamiShape[] = [
  paperBoat,
  paperAirplane,
  paperButterfly,
  paperCrane,
  jumpingFrog,
];

export function getShapeById(id: string): OrigamiShape | undefined {
  return ORIGAMI_SHAPES.find((shape) => shape.id === id);
}