import { Injectable } from '@nestjs/common';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class QuizzesService {
  private quizzes: any[];

  constructor() {
    const dataFilePath = path.join(__dirname, 'quizzes.yaml');
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    const yamlObject = yaml.safeLoad(fileContent);

    if (yamlObject.quizzes) {
      this.quizzes = yamlObject.quizzes;
    }
  }

  list(page: number = 1, per_page: number = 10) {
    const begin = (page - 1) * per_page;
    const end = begin + per_page;

    return this.quizzes
      .sort((quiz1, quiz2) => {
        return quiz2.level - quiz1.level;
      })
      .slice(begin, end);
  }

  questions(page: number = 1, per_page: number = 10) {
    const quizzes = this.list(page, per_page).map(
      (quiz: { id; quiz; examples; level }) => {
        return {
          id: quiz.id,
          quiz: quiz.quiz,
          examples: quiz.examples,
          level: quiz.level,
        };
      },
    );
    return {
      page: Number(page),
      per_page: Number(per_page),
      total: this.quizzes.length,
      quizzes,
    };
  }

  check(quizId: string, answer: number) {
    return this.quizzes
      .filter(quiz => {
        return quiz.id === quizId;
      })
      .map(quiz => {
        return quiz.answer === answer;
      })
      .pop();
  }
}
