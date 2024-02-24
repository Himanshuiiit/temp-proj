import { Module, forwardRef } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController, ReleaseController } from './apps.controller';
import { App } from './entities/app.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { PagesService } from './pages/pages.service';
import { VersionsService } from './versions/versions.service';
import { Version } from './entities/versions.entity';
import { Page } from './entities/pages.entity';
import { VersionsController } from './versions/versions.controller';
import { PagesController } from './pages/pages.controller';
import { AppVersionGuard } from './guards/app-version.guard';
import { AppPageGuard } from './guards/app-page.guard';
import { UsersModule } from 'src/users/users.module';
import { ComponentsModule } from '../components/components.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([App, User, Version, Page]),
    UsersModule,
    forwardRef(() => ComponentsModule),
  ],
  controllers: [
    AppsController,
    VersionsController,
    PagesController,
    ReleaseController,
  ],
  providers: [
    AppsService,
    PagesService,
    VersionsService,
    AppVersionGuard,
    AppPageGuard,
  ],
  exports: [PagesService],
})
export class AppsModule {}
