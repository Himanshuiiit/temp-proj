import { Controller, Post, Body, Patch, UseGuards, Delete } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { CreateComponentDto, UpdateComponentDto } from './dto/component.dto';
import { AuthGuard } from '../guards/auth.guard';
import { AppUserGuard } from '../guards/appUser.guard';
import { AppPageGuard } from '../apps/guards/app-page.guard';
import { AppComponentGuard } from './guards/app-component.guard';

@UseGuards(AuthGuard)
@UseGuards(AppUserGuard)
@Controller('components')
export class ComponentsController {
  constructor(private componentsService: ComponentsService) {}

  @Post('/')
  @UseGuards(AppPageGuard)
  async createComponent(
    @Body('pageId') pageId: string,
    @Body('appId') appId: string,
    @Body('componentData') createComponentDto: CreateComponentDto
  ) {
    return this.componentsService.create(createComponentDto, appId, pageId);
  }

  @Patch('/')
  @UseGuards(AppComponentGuard)
  async updateComponent(
    @Body('componentId') id: string,
    @Body('componentData') updateComponentDto: UpdateComponentDto
  ) {
    return this.componentsService.update(updateComponentDto, id);
  }

  @Delete('/')
  @UseGuards(AppComponentGuard)
  async removeComponent(@Body('componentId') id: string) {
    return this.componentsService.remove(id);
  }
}
