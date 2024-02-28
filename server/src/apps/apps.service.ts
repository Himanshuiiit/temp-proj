import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { App } from './entities/app.entity';
import { User } from 'src/users/users.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { VersionsService } from './versions/versions.service';
import { UsersService } from '../users/users.service';
import { PagesService } from './pages/pages.service';
import { ComponentsService } from '../components/components.service';
import { Version } from './entities/versions.entity';

@Injectable()
export class AppsService {
  constructor(
    private versionsService: VersionsService,
    private pagesService: PagesService,
    private usersService: UsersService,
    private componentsService: ComponentsService,
    @InjectEntityManager() private entityManager: EntityManager,
    @InjectRepository(App) private appRepository: Repository<App>
  ) {}

  async create(name: string, user: User): Promise<App> {
    const newApp = this.appRepository.create({
      name: name,
    });

    delete user.ownedApps;
    delete user.apps;
    newApp.owner = user;
    newApp.users = [user];

    const app = await this.appRepository.save(newApp)
    const version = await this.versionsService.createVersion('v1', app)
    // await this.entityManager.transaction(async (manager) => {
    //   await manager.save(newApp);
    //   await this.versionsService.createVersion('v1', newApp);
    // });
    return app;
  }

  async updateName(name: string, appId: string)
  {
    const app = await this.findOne(appId)
    Object.assign(app, {
      name
    })
    return this.appRepository.save(app)
  }

  async findAll(user: User): Promise<App[]> {
    const apps = await this.appRepository.find({
      where: {
        users: { id: user.id },
      },
      relations: ['owner'],
    });

    for (const app of apps) {
      delete app.owner.id;
    }
    return apps;
  }

  async findOne(id: string, relations: string[] = []): Promise<App> {
    if (!id) return null;
    const app = await this.appRepository.findOne({
      where: {
        id,
      },
      relations: relations,
    });

    if (app?.owner) delete app.owner.id;

    if (app?.users)
      for (const user of app.users) {
        delete user.id;
      }

    if (app?.id === id) {
      return app;
    }
    return null;
  }

  async releasedApp(appId: string) {
    const app = await this.findOne(appId);
    if (!app.release) throw new UnauthorizedException('App not released yet');
    const version = await this.versionsService.getVersion(app.release, [
      'pages',
      'pages.components',
      'pages.components.layouts',
    ]);
    return { app, version };
  }

  async release(appId: string, versionId: string)
  {
    const app = await this.findOne(appId)
    if(app.release)
    {
      await this.versionsService.updateVersion(app.release, {
        released: false
      })
    }
    await this.versionsService.updateVersion(versionId, {
      released: true
    })
    app.release = versionId
    const tor = await this.appRepository.save(app)
    return tor
  }


  async remove(id: string) {
    await this.entityManager.transaction(async (manager) => {
      await manager.delete(App, id);
    });
  }

  async addUser(appId: string, userEmail: string) {
    const app = await this.appRepository.findOne({
      where: {
        id: appId,
      },
      relations: ['users'],
    });
    const user = await this.usersService.findEmail(userEmail);
    if (!user) throw new NotFoundException('User not found! Please check the email address and try again.');
    app.users.push(user);
    this.appRepository.save(app);
  }

  async createVersion(id: string, appId: string, name: string) {
    const app = await this.findOne(appId);
    const version = await this.versionsService.getVersion(id, [
      'pages',
      'pages.components',
      'pages.components.layouts',
    ]);
    const pages = version.pages;
    let newVersion: Version;
    await this.entityManager.transaction(async (manager) => {
      newVersion = await this.versionsService.createVersion(name, app);
      pages.map(async (page) => {
        const components = page.components;
        const newPage = await this.pagesService.createPage(
          newVersion.id,
          {
            name: page.name,
            route: page.route,
          },
          app.id
        );

        components.map(async (component) => {
          const layout = component.layouts;
          delete component.layouts;
          delete component.id;
          delete component.appId, delete component.pageId;
          delete component.createdAt;
          delete layout.id;
          delete layout.appId;

          await this.componentsService.create(
            {
              component,
              layout,
            },
            app.id,
            newPage.id
          );
        });
      });
    });
  }
}
