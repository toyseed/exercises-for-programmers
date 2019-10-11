import { Quiz } from './quiz';

export interface QuizList {
  page: number;
  per_page: number;
  total: number;
  quizzes: Quiz[];
}
