import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dtos/register-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async findUserByEmail(email: string) {
    const user = await this.usersService.findEmail(email);

    if (!user) return null;
    return user;
  }

  async signIn(user: User) {
    if (!user) throw new BadRequestException('Unauthorized');

    let userExists = await this.findUserByEmail(user.email);

    if (!userExists) userExists = await this.registerUser(user);

    return userExists;
  }

  async registerUser(user: RegisterUserDto) {
    try {
      const newUser = await this.usersService.create(user);
      return newUser;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
