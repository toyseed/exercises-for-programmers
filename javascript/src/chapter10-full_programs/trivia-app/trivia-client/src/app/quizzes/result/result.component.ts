import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../score.service';

@Component({
  selector: 'trv-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  quizTotal: number;
  correctAnswer: number;

  constructor(private scoreService: ScoreService) {
    this.quizTotal = scoreService.quizTotal;
    this.correctAnswer = scoreService.correctAnswer;
  }

  ngOnInit() {
  }

}
