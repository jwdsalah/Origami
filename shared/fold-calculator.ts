/**
 * Fold Calculator
 * Handles fold angle detection, progress calculation, and fold line visibility
 */

import type { FoldStep } from './origami-shapes';

export interface FoldState {
  currentAngle: number; // Current device/touch fold angle in degrees
  targetAngle: number; // Target fold angle for current step
  tolerance: number; // Acceptable angle variance
  progress: number; // Fold progress (0-100)
  isCorrectAngle: boolean; // Whether current angle is within tolerance
  foldLineVisible: boolean; // Whether fold line should be shown
  foldLineOpacity: number; // Semi-transparent opacity (0-1)
}

export class FoldCalculator {
  /**
   * Calculate fold state based on current angle and target
   */
  static calculateFoldState(
    currentAngle: number,
    targetAngle: number,
    tolerance: number
  ): FoldState {
    // Normalize angles to 0-180 range
    const normalizedCurrent = this.normalizeAngle(currentAngle);
    const normalizedTarget = this.normalizeAngle(targetAngle);

    // Calculate angle difference
    const angleDifference = Math.abs(normalizedCurrent - normalizedTarget);

    // Check if angle is within tolerance
    const isCorrectAngle = angleDifference <= tolerance;

    // Calculate progress based on proximity to target
    const maxDeviation = 90; // Max deviation from target
    const deviation = Math.min(angleDifference, maxDeviation);
    const progress = Math.max(0, 100 - (deviation / maxDeviation) * 100);

    // Calculate fold line opacity based on proximity to target
    // Opacity increases as player gets closer to correct angle
    const opacityThreshold = tolerance * 2; // Start showing at 2x tolerance
    let foldLineOpacity = 0;
    if (angleDifference <= opacityThreshold) {
      foldLineOpacity = 1 - angleDifference / opacityThreshold;
    }

    // Show fold line when angle is close or correct
    const foldLineVisible = angleDifference <= opacityThreshold;

    return {
      currentAngle: normalizedCurrent,
      targetAngle: normalizedTarget,
      tolerance,
      progress,
      isCorrectAngle,
      foldLineVisible,
      foldLineOpacity: Math.max(0.3, foldLineOpacity), // Min opacity 0.3 for visibility
    };
  }

  /**
   * Normalize angle to 0-180 range
   */
  static normalizeAngle(angle: number): number {
    let normalized = angle % 360;
    if (normalized < 0) normalized += 360;
    if (normalized > 180) normalized = 360 - normalized;
    return normalized;
  }

  /**
   * Check if fold is complete (angle maintained for duration)
   */
  static isFoldComplete(
    foldState: FoldState,
    holdDurationMs: number = 500
  ): boolean {
    return foldState.isCorrectAngle && foldState.progress >= 90;
  }

  /**
   * Get visual feedback for current fold state
   */
  static getVisualFeedback(foldState: FoldState): VisualFeedback {
    const { progress, isCorrectAngle, foldLineOpacity } = foldState;

    let feedbackType: 'idle' | 'warming' | 'correct' | 'perfect' = 'idle';

    if (progress < 30) {
      feedbackType = 'idle';
    } else if (progress < 70) {
      feedbackType = 'warming';
    } else if (isCorrectAngle && progress < 95) {
      feedbackType = 'correct';
    } else if (isCorrectAngle && progress >= 95) {
      feedbackType = 'perfect';
    }

    return {
      feedbackType,
      progress,
      foldLineOpacity,
      color: this.getFeedbackColor(feedbackType),
      particleEmission: feedbackType === 'perfect',
    };
  }

  /**
   * Get color for visual feedback
   */
  private static getFeedbackColor(
    feedbackType: 'idle' | 'warming' | 'correct' | 'perfect'
  ): string {
    switch (feedbackType) {
      case 'idle':
        return '#888888'; // Gray
      case 'warming':
        return '#FFA500'; // Orange
      case 'correct':
        return '#4CAF50'; // Green
      case 'perfect':
        return '#00FF00'; // Bright green
      default:
        return '#888888';
    }
  }

  /**
   * Calculate fold line position in 3D space
   */
  static calculateFoldLineInScene(
    foldStep: FoldStep,
    progress: number
  ): FoldLine {
    const { foldLineStart, foldLineEnd, axis } = foldStep;

    return {
      start: foldLineStart,
      end: foldLineEnd,
      axis,
      progress,
    };
  }

  /**
   * Smooth angle transitions for better UX
   */
  static smoothAngle(
    currentAngle: number,
    targetAngle: number,
    smoothingFactor: number = 0.1
  ): number {
    return currentAngle + (targetAngle - currentAngle) * smoothingFactor;
  }
}

export interface VisualFeedback {
  feedbackType: 'idle' | 'warming' | 'correct' | 'perfect';
  progress: number;
  foldLineOpacity: number;
  color: string;
  particleEmission: boolean;
}

export interface FoldLine {
  start: [number, number, number];
  end: [number, number, number];
  axis: 'x' | 'y' | 'z';
  progress: number;
}

/**
 * Track fold history for scoring and validation
 */
export class FoldTracker {
  private foldHistory: FoldEvent[] = [];
  private currentStepStartTime: number = 0;

  recordFoldEvent(event: FoldEvent): void {
    this.foldHistory.push(event);
  }

  getCurrentStepDuration(): number {
    return Date.now() - this.currentStepStartTime;
  }

  startStepTimer(): void {
    this.currentStepStartTime = Date.now();
  }

  getFoldAccuracy(): number {
    if (this.foldHistory.length === 0) return 0;

    const accurateCount = this.foldHistory.filter(
      (e) => e.isAccurate
    ).length;
    return (accurateCount / this.foldHistory.length) * 100;
  }

  getAverageCompletionTime(): number {
    if (this.foldHistory.length === 0) return 0;

    const totalTime = this.foldHistory.reduce(
      (sum, e) => sum + e.completionTime,
      0
    );
    return totalTime / this.foldHistory.length;
  }

  reset(): void {
    this.foldHistory = [];
    this.currentStepStartTime = 0;
  }
}

export interface FoldEvent {
  stepId: string;
  timestamp: number;
  completionTime: number;
  angleDeviation: number;
  isAccurate: boolean;
  feedback: VisualFeedback;
}