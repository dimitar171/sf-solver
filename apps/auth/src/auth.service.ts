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

    const user1 = new User();
    user1.username = username;
    user1.salt = await bcrypt.genSalt();
    user1.password = await bcrypt.hash(password, user1.salt);
    const exists = await this.repo.findOneBy({ username });
    if (exists) {
      throw new ConflictException('Username already exists');
    }
    try {
      await this.repo.save(user1);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async signIn(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const user = await this.repo.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
  async findUser(username: string) {
    return this.repo.findOneBy({ username });
  }
}
