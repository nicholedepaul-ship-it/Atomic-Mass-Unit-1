export interface Isotope {
  name: string;
  mass: string; // Keeping as string to preserve specific decimal formatting visually
  percent: string;
  massNum: number; // For calculations/sorting
}

export interface ProblemData {
  id: string;
  elementName: string;
  isotopes: Isotope[];
  correctAnswer: string;
}

export enum FeedbackStatus {
  IDLE = 'IDLE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  MISSING_UNIT = 'MISSING_UNIT'
}