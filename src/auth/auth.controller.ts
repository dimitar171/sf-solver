import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //create a User
  @Post('/signup')
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }
  //Login a user a User
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(createUserDto);
  }
}
