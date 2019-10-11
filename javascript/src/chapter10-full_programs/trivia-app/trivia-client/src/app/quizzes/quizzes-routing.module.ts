import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzesComponent } from './quizzes.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path: '',
    component: QuizzesComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent
  },
  {
    path: 'result',
    component: ResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzesRoutingModule {}
