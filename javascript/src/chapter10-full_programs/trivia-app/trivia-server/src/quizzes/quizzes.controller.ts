import { Controller, Get, HttpException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  list(@Query('page') page: number, @Query('per_page') perPage: number) {
    return this.quizzesService.questions(page, perPage);
  }

  @Get('check/:quizId')
  check(
    @Param('quizId') quizId: string,
    @Query('answer', ParseIntPipe) answer: number,
  ) {
    const result = this.quizzesService.check(quizId, answer);

    if (result === undefined) {
      throw new HttpException('invalid argument exception', 404);
    } else {
      return result;
    }
  }
}
