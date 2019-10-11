import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import * as cors from 'cors';

@Module({
  controllers: [QuizzesController],
  providers: [QuizzesService]
})
export class QuizzesModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(cors()).forRoutes('quizzes');
  }
}
// export class QuizzesModule {
// }
