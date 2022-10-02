import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

//custom decorator for the curent user
export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
