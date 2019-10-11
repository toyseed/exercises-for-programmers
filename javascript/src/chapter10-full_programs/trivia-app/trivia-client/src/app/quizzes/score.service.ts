import { Injectable } from '@angular/core';

@Injectable()
export class ScoreService {

  public quizTotal: number;
  public correctAnswer: number;

  constructor() {
    this.init();
  }

  init() {
    this.quizTotal = 0;
    this.correctAnswer = 0;
  }
}
