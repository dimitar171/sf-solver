import { Module } from '@nestjs/common';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { Workspace } from './workspaces/workspace.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Workspace],
      synchronize: true,
      // type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: 'Nightmare171@',
      // database: 'postgres',
      // entities: [__dirname + '/../**/*.entity.ts'],
      // synchronize: true,
    }),
    WorkspacesModule,
    AuthModule,
  ],
})
export class AppModule {}
