import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'test.sqlite',
          synchronize: true,
          entities: [User],
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await service.create({
      email: 'a@a.com',
      name: 'a',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('a@a.com');
  });

  it('should find a user by id', async () => {
    const user = await service.create({
      email: 'a@a.com',
      name: 'a',
    });
    const foundUser = await service.findOne(user.id);
    expect(foundUser).toHaveProperty('id');
    expect(foundUser.email).toBe('a@a.com');
  });

  it('should find a user by user', async () => {
    const user = await service.create({
      email: 'a@a.com',
      name: 'a',
    });
    const foundUser = await service.findEmail(user.email);
    expect(foundUser).toHaveProperty('id');
    expect(foundUser.email).toBe('a@a.com');
  });

  it('should delete a user', async () => {
    const user = await service.create({
      email: 'a@a.com',
      name: 'a',
    });
    await service.deleteUser(user);
    const foundUser = await service.findOne(user.id);
    expect(foundUser).toBeNull();
  });
});
