import { Module } from '@nestjs/common';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { Workspace } from './workspaces/workspace.entity';
import { Question } from './questions/question.entity';
import { QuestionsModule } from './questions/questions.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    WorkspacesModule,
    AuthModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
