import { Controller, Delete, Get, Session, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersSerive: UsersService) {}

  @Delete('/')
  async deleteUser(@CurrentUser() user: User, @Session() session: any) {
    await this.usersSerive.deleteUser(user);
    session.user = null;
    return {};
  }

  @Get('/')
  async findUser(@CurrentUser() user: User) {
    if (!user) return null;
    return user;
  }
}
