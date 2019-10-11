import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizzesComponent } from './quizzes.component';
import { QuizzesRoutingModule } from './quizzes-routing.module';
import { QuizzesService } from './quizzes.service';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScoreService } from './score.service';


@NgModule({
  declarations: [QuizzesComponent, QuizComponent, ResultComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    QuizzesRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [QuizzesService, ScoreService]
})
export class QuizzesModule { }
