import { Test, TestingModule } from '@nestjs/testing';
import { AppsService } from './apps.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from './entities/app.entity';
import { VersionsService } from './versions/versions.service';
import { Version } from './entities/versions.entity';
import { User } from '../users/users.entity';
import { Page } from './entities/pages.entity';

describe('AppsService', () => {
  let service: AppsService;
  let fakeVersionsService: Partial<VersionsService>;

  const user: User = {
    id: '1',
    email: 'b@b.com',
    name: 'b',
  } as User;

  beforeEach(async () => {
    fakeVersionsService = {
      createVersion: (name, app) => {
        return Promise.resolve({
          id: '1',
          name: name,
          app: app,
        } as Version);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'test.sqlite',
          synchronize: true,
          entities: [App, User, Version, Page],
        }),
        TypeOrmModule.forFeature([App, User, Version, Page]),
      ],
      providers: [
        AppsService,
        {
          provide: VersionsService,
          useValue: fakeVersionsService,
        },
      ],
    }).compile();

    service = module.get<AppsService>(AppsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  }, 10000);

  it('should create an app', async () => {
    const app = await service.create('demo', user);
    expect(app).toHaveProperty('id');
    expect(app.name).toBe('demo');
  });
});
