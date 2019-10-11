import { Component, OnInit } from '@angular/core';
import { QuizzesService } from '../quizzes.service';
import { Quiz } from '../quiz';
import { QuizList } from '../quiz-list';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, tap } from 'rxjs/operators';
import { ScoreService } from '../score.service';

@Component({
  selector: 'trv-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  private PER_PAGE = 2;
  private quizList: QuizList;
  private currentIndex = 0;

  currentQuiz: Quiz;
  answer: number = 0;

  constructor(
    private quizzesService: QuizzesService,
    private scoreService: ScoreService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    scoreService.init();
  }

  ngOnInit() {
    this.populateCurrentQuiz();
  }

  private populateCurrentQuiz() {
    if (this.quizList && this.quizList.total <= this.currentIndex) {
      this.router.navigateByUrl('/quizzes/result');
      return;
    }

    this.answer = 0;

    if (this.quizList && this.quizList.quizzes.length > this.currentIndex) {
      this.currentQuiz = this.quizList.quizzes[this.currentIndex++];
      return;
    }

    let page = 1;
    let perPage = this.PER_PAGE;

    if (this.quizList) {
      page = this.quizList.page + 1;
      perPage = this.quizList.per_page;
    }

    this.quizzesService.list(page, perPage).subscribe(quizList => {
      if (this.quizList) {
        this.quizList.quizzes = this.quizList.quizzes.concat(quizList.quizzes);
      } else {
        this.quizList = quizList;
        this.scoreService.quizTotal = this.quizList.total;
      }

      this.currentQuiz = this.quizList.quizzes[this.currentIndex++];
    });
  }

  check() {
    this.quizzesService
      .check(this.currentQuiz.id, this.answer)
      .pipe(
        tap(isCorrect => {
          if (isCorrect) {
            this.scoreService.correctAnswer++;
            this.snackBar.open('correct!!', 'ok', { duration: 1000 });
          } else {
            this.router.navigateByUrl('/quizzes/result');
          }
        }),
        delay(1000),
      )
      .subscribe(
        isCorrect => {
          if (!isCorrect) {
            return;
          }

          this.populateCurrentQuiz();
        },
        error => console.error(error),
        () => console.log('complete check'),
      );
  }
}
