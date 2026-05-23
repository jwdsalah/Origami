/**
 * 3D Geometry Utilities
 * Handles 3D calculations for paper folding and fold line rendering
 */

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Matrix4 {
  elements: number[];
}

export class Geometry {
  /**
   * Create a rotation matrix based on fold axis and angle
   */
  static createRotationMatrix(
    axis: 'x' | 'y' | 'z',
    angleRadians: number
  ): Matrix4 {
    const cos = Math.cos(angleRadians);
    const sin = Math.sin(angleRadians);
    const elements: number[] = [
      1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
    ];

    switch (axis) {
      case 'x':
        elements[5] = cos;
        elements[6] = -sin;
        elements[9] = sin;
        elements[10] = cos;
        break;
      case 'y':
        elements[0] = cos;
        elements[2] = sin;
        elements[8] = -sin;
        elements[10] = cos;
        break;
      case 'z':
        elements[0] = cos;
        elements[1] = -sin;
        elements[4] = sin;
        elements[5] = cos;
        break;
    }

    return { elements };
  }

  /**
   * Multiply a vector by a matrix
   */
  static multiplyVectorByMatrix(
    vector: Vector3,
    matrix: Matrix4
  ): Vector3 {
    const { elements } = matrix;
    const x = vector.x * elements[0] + vector.y * elements[4] + vector.z * elements[8] + elements[12];
    const y = vector.x * elements[1] + vector.y * elements[5] + vector.z * elements[9] + elements[13];
    const z = vector.x * elements[2] + vector.y * elements[6] + vector.z * elements[10] + elements[14];

    return { x, y, z };
  }

  /**
   * Calculate the normal vector of a plane
   */
  static calculatePlaneNormal(
    point1: Vector3,
    point2: Vector3,
    point3: Vector3
  ): Vector3 {
    const v1 = {
      x: point2.x - point1.x,
      y: point2.y - point1.y,
      z: point2.z - point1.z,
    };

    const v2 = {
      x: point3.x - point1.x,
      y: point3.y - point1.y,
      z: point3.z - point1.z,
    };

    // Cross product
    return {
      x: v1.y * v2.z - v1.z * v2.y,
      y: v1.z * v2.x - v1.x * v2.z,
      z: v1.x * v2.y - v1.y * v2.x,
    };
  }

  /**
   * Normalize a vector
   */
  static normalizeVector(vector: Vector3): Vector3 {
    const length = Math.sqrt(
      vector.x ** 2 + vector.y ** 2 + vector.z ** 2
    );

    if (length === 0) {
      return { x: 0, y: 0, z: 0 };
    }

    return {
      x: vector.x / length,
      y: vector.y / length,
      z: vector.z / length,
    };
  }

  /**
   * Calculate distance between two points
   */
  static distance(point1: Vector3, point2: Vector3): number {
    return Math.sqrt(
      (point2.x - point1.x) ** 2 +
        (point2.y - point1.y) ** 2 +
        (point2.z - point1.z) ** 2
    );
  }

  /**
   * Dot product of two vectors
   */
  static dotProduct(v1: Vector3, v2: Vector3): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  /**
   * Cross product of two vectors
   */
  static crossProduct(v1: Vector3, v2: Vector3): Vector3 {
    return {
      x: v1.y * v2.z - v1.z * v2.y,
      y: v1.z * v2.x - v1.x * v2.z,
      z: v1.x * v2.y - v1.y * v2.x,
    };
  }

  /**
   * Calculate angle between two vectors (in degrees)
   */
  static angleBetweenVectors(v1: Vector3, v2: Vector3): number {
    const dot = this.dotProduct(v1, v2);
    const len1 = Math.sqrt(v1.x ** 2 + v1.y ** 2 + v1.z ** 2);
    const len2 = Math.sqrt(v2.x ** 2 + v2.y ** 2 + v2.z ** 2);

    if (len1 === 0 || len2 === 0) return 0;

    const cos = dot / (len1 * len2);
    const radians = Math.acos(Math.max(-1, Math.min(1, cos)));

    return (radians * 180) / Math.PI;
  }

  /**
   * Project a point onto a line
   */
  static projectPointOntoLine(
    point: Vector3,
    lineStart: Vector3,
    lineEnd: Vector3
  ): Vector3 {
    const lineDir = {
      x: lineEnd.x - lineStart.x,
      y: lineEnd.y - lineStart.y,
      z: lineEnd.z - lineStart.z,
    };

    const pointDir = {
      x: point.x - lineStart.x,
      y: point.y - lineStart.y,
      z: point.z - lineStart.z,
    };

    const lineLengthSq =
      lineDir.x ** 2 + lineDir.y ** 2 + lineDir.z ** 2;
    const t = this.dotProduct(pointDir, lineDir) / lineLengthSq;
    const clamped = Math.max(0, Math.min(1, t));

    return {
      x: lineStart.x + clamped * lineDir.x,
      y: lineStart.y + clamped * lineDir.y,
      z: lineStart.z + clamped * lineDir.z,
    };
  }
}

/**
 * Paper geometry representation
 */
export class PaperGeometry {
  private vertices: Vector3[] = [];
  private faces: number[][] = [];

  constructor(width: number, height: number) {
    this.createPlane(width, height);
  }

  private createPlane(width: number, height: number): void {
    const w = width / 2;
    const h = height / 2;

    this.vertices = [
      { x: -w, y: -h, z: 0 },
      { x: w, y: -h, z: 0 },
      { x: w, y: h, z: 0 },
      { x: -w, y: h, z: 0 },
    ];

    this.faces = [[0, 1, 2], [0, 2, 3]];
  }

  getVertices(): Vector3[] {
    return this.vertices;
  }

  getFaces(): number[][] {
    return this.faces;
  }

  /**
   * Apply a fold transformation to the geometry
   */
  applyFold(
    foldLineStart: Vector3,
    foldLineEnd: Vector3,
    angle: number,
    axis: 'x' | 'y' | 'z'
  ): void {
    const angleRadians = (angle * Math.PI) / 180;
    const rotationMatrix = Geometry.createRotationMatrix(axis, angleRadians);

    // Transform vertices based on fold
    this.vertices = this.vertices.map((vertex) => {
      return Geometry.multiplyVectorByMatrix(vertex, rotationMatrix);
    });
  }
}