import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizzesModule } from './quizzes/quizzes.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [QuizzesModule],
})
export class AppModule {}
