import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  // create user in db
  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  // return user from db using id
  async findOne(id: string, relations: string[] = []): Promise<User> {
    if (!id) return null;

    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: relations,
    });

    return user;
  }

  // return user from db using email
  async findEmail(email: string, relations: string[] = []): Promise<User> {
    if (!email) return null;
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: relations,
    });

    if (user?.email === email) return user;
    return null;
  }

  async deleteUser(user: User) {
    return this.userRepository.remove(user);
  }
}
