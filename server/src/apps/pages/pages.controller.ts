import { Body, Controller, Delete, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { PagesService } from './pages.service';
import { AppUserGuard } from '../../guards/appUser.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { AppPageGuard } from '../guards/app-page.guard';
import { UpdatePageDto } from '../dto/update-page.dto';
import { CreatePageDto } from '../dto/create-page.dto';
import { AppVersionGuard } from '../guards/app-version.guard';

@UseGuards(AuthGuard)
@UseGuards(AppUserGuard)
@Controller('pages')
export class PagesController {
  constructor(private pagesService: PagesService) {}

  @UseGuards(AppVersionGuard)
  @Post('/')
  async createPage(
    @Body('versionId') versionId: string,
    @Body('page') createPageDto: CreatePageDto,
    @Body('appId') appId: string,
    @Res() res: any
  ) {
    const page = await this.pagesService.createPage(versionId, createPageDto, appId);
    return res.status(201).send(page);
  }

  @UseGuards(AppPageGuard)
  @Delete('/')
  async deletePage(@Body('pageId') id: string, @Body('appId') appId: string, @Res() res: any) {
    await this.pagesService.deletePage(id);
    return res.status(201).send({ message: 'Page deleted' });
  }

  @UseGuards(AppPageGuard)
  @Patch('/')
  async updatePage(
    @Body('pageId') id: string,
    @Body('page') updatePageDto: UpdatePageDto,
    @Body('appId') appId: string,
    @Res() res: any
  ) {
    const page = await this.pagesService.updatePage(id, updatePageDto);
    return res.status(200).send(page);
  }
}
