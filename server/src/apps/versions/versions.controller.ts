import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { VersionsService } from './versions.service';
import { AuthGuard } from '../../guards/auth.guard';
import { AppVersionGuard } from '../guards/app-version.guard';
import { AppUserGuard } from '../../guards/appUser.guard';

@UseGuards(AuthGuard)
@UseGuards(AppUserGuard)
@Controller('versions')
export class VersionsController {
  constructor(private versionsService: VersionsService) {}

  @UseGuards(AppVersionGuard)
  @Post('/')
  async getVersion(@Body('versionId') id: string) {
    return this.versionsService.getVersion(id, ['pages', 'pages.components', 'pages.components.layouts']);
  }

  @UseGuards(AppVersionGuard)
  @Delete('/')
  async deleteVersion(@Body('versionId') id: string) {
    return this.versionsService.deleteVersion(id);
  }
}
