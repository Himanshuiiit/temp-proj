import { Controller, Get, Post, Body, Delete, UseGuards, Res, Session, Param } from '@nestjs/common';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { AuthGuard } from '../guards/auth.guard';
import { AppOwnerGuard } from 'src/guards/appOwner.guard';
import { AppUserGuard } from 'src/guards/appUser.guard';

@UseGuards(AuthGuard)
@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Post('/create')
  async create(@CurrentUser() user: User, @Body() createAppDto: CreateAppDto, @Res() res: any) {
    const name = createAppDto.name;
    //check if app name is unique or not w.r.t. user
    if (user.apps.some((app) => app.name === name)) return res.status(409).send({ message: 'App name already exists' });

    // create app
    const app = await this.appsService.create(name, user);
    return res.status(201).send(app);
  }

  @Post('/update')
  @UseGuards(AppOwnerGuard)
  async updateName(
    @CurrentUser() user: User,
    @Body('name') name: string,
    @Body('appId') appId: string,
    @Res() res: any
  ) {
    if (user.apps.some((app) => app.name === name)) return res.status(409).send({ message: 'App name already exists' });
    const app = await this.appsService.updateName(name, appId)
    return res.status(201).send(app)
  }

  @Post('/')
  @UseGuards(AppUserGuard)
  async findOne(@Body('appId') id: string, @CurrentUser() user: User, @Session() session: any) {
    // returns app with id and user with relations owner, users, versions
    const app = await this.appsService.findOne(id, ['owner', 'users', 'versions']);
    return app;
  }

  @Get('/')
  async findAll(@CurrentUser() user: User, @Session() session: any, @Res() res: any) {
    // returns all apps for the user in session
    const apps = await this.appsService.findAll(user);
    return res.status(200).send(apps);
  }

  

  @UseGuards(AppUserGuard)
  @Post('/create-version')
  async createVersion(
    @Body('versionId') versionId: string,
    @Body('appId') appId: string,
    @Body('name') name: string,
    @Res() res: any
  ) {
    await this.appsService.createVersion(versionId, appId, name);
    return res.status(201).send({ message: 'Version Created' });
  }

  @Post('/release')
  @UseGuards(AppOwnerGuard)
  async release(
    @Body('appId') appId: string,
    @Body('versionId') versionId: string,
    @Res() res:any
  ){
    const app = await this.appsService.release(appId, versionId)
    return res.status(201).send({
      message: "version Released",
    })
  }

  @Delete('/')
  @UseGuards(AppOwnerGuard)
  async remove(@Body('appId') id: string, @Res() res: any) {
    // only app owner can delete the app
    await this.appsService.remove(id);
    return res.status(201).send('App Deleted');
  }

  @Post('/add-user')
  @UseGuards(AppOwnerGuard)
  async addUser(@Body('appId') appId: string, @Body('email') userEmail: string, @Res() res: any) {
    // add user to app using email id
    const app = await this.appsService.addUser(appId, userEmail);
    return res.status(201).send(app);
  }
}

@Controller('/release')
export class ReleaseController {

  constructor(private appsService: AppsService){}

  @Get('/:id')
  async releasedApp(@Param("id") id: string)
  {
    return this.appsService.releasedApp(id)
  }
}
