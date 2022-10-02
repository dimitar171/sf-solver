import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtPayload } from './jwt-payload.interface';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    const { username, password } = createUserDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);
    const exists = await this.repo.findOneBy({ username });
    if (exists) {
      throw new ConflictException('Username already exists');
    }
    try {
      await this.repo.save(user);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async signIn(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const username = await this.validateUserPassword(createUserDto);

    if (!username) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
  //check for sign in password
  async validateUserPassword(createUserDto: CreateUserDto): Promise<string> {
    const { username, password } = createUserDto;
    const user = await this.repo.findOneBy({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }
}
