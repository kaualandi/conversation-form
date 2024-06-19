import { Response } from '../components/messaging-chat-window';

export interface QuestionOption {
  label: string;
  value: string | boolean;
  hasDescription: boolean;
}

export interface Question {
  id: string;
  questions: string[];
  options: QuestionOption[];
}

export interface Validations {
  [key: string]: (res: Response[]) => void;
}
