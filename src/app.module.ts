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
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Workspace, Question],
      synchronize: true,
      // //   // type: 'postgres',
      // //   // host: 'localhost',
      // //   // port: 5432,
      // //   // username: 'postgres',
      // //   // password: 'Nightmare171@',
      // //   // database: 'postgres',
      // //   // entities: [__dirname + '/../**/*.entity.ts'],
      // //   // synchronize: true,
    }),
    WorkspacesModule,
    AuthModule,
    QuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
