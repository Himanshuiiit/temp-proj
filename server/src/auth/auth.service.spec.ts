import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // users array to store the users
    const users: User[] = [];

    // create a fake copy of the UsersService
    fakeUsersService = {
      findEmail: (email: string) => {
        const user = users.find((user) => user.email === email);
        return Promise.resolve(user);
      },

      findOne: (id: string) => {
        const user = users.find((user) => user.id === id);
        return Promise.resolve(user);
      },

      create: (user: Partial<User>) => {
        const userObj: User = {
          id: '1',
          email: user.email,
          name: user.name,
        } as User;
        users.push(userObj);
        return Promise.resolve(userObj);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('creates an instance of auth service', () => {
    expect(service).toBeDefined();
  });

  it('registers a user', async () => {
    const data = {
      email: 'a@a.com',
      name: 'a',
    } as User;
    const user = await service.signIn(data);

    expect(user).toEqual({
      id: '1',
      ...data,
    });
  });

  it('signs in a user', async () => {
    const data = {
      email: 'a@a.com',
      name: 'a',
    } as User;

    const user = await service.signIn(data);
    expect(user).toEqual({
      id: '1',
      ...data,
    });
  });
});
