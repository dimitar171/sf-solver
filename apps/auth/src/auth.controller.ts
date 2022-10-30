import { Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @EventPattern('sign-up')
  signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @MessagePattern({ cmd: 'sign-in' })
  signIn(createUserDto: CreateUserDto) {
    return this.authService.signIn(createUserDto);
  }
  @MessagePattern({ cmd: 'find-user' })
  findUser(username: string) {
    return this.authService.findUser(username);
  }
}
