import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QuizList } from './quiz-list';

@Injectable()
export class QuizzesService {
  private listUrl = 'http://localhost:3000/quizzes';
  private checkUrl = this.listUrl + '/check/';

  constructor(private http: HttpClient) {}

  list(page: number = 1, per_page: number = 5) {
    // !! chaining 으로 구현해야 동작함.
    // params.set(...);params.set(...) 형태로는 동작 안함.
    const params = new HttpParams()
      .set('page', String(page))
      .set('per_page', String(per_page));
    console.log(params);
    return this.http.get<QuizList>(this.listUrl, { params: params });
  }

  check(quizId: string, answer: number) {
    const params = new HttpParams()
      .set('answer', <string>(<unknown>answer));

    return this.http.get<boolean>(this.checkUrl + quizId, { params });
  }
}
