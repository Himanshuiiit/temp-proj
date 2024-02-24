import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Component } from './entities/component.entity';
import { Layout } from './entities/layout.entity';
import { CreateComponentDto, UpdateComponentDto } from './dto/component.dto';
import { PagesService } from '../apps/pages/pages.service';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Component)
    private componentsRepository: Repository<Component>,
    @InjectRepository(Layout)
    private layoutRepository: Repository<Layout>,
    private pagesService: PagesService,
    private entityManager: EntityManager
  ) {}

  async findOne(id: string, relations: string[] = []): Promise<Component> {
    return this.componentsRepository.findOne({
      where: { id },
      relations: relations,
    });
  }

  async create(componentDto: CreateComponentDto, appId: string, pageId: string) {
    const layout = componentDto.layout;
    const newComponent = this.componentsRepository.create({ ...componentDto.component, appId, pageId });

    const page = await this.pagesService.getPage(pageId);
    newComponent.page = page;

    await this.entityManager.transaction(async (manager) => {
      await manager.save(newComponent);
      const newLayout = this.layoutRepository.create({ ...layout, component: newComponent, appId });
      await manager.save(newLayout);
    });
    return newComponent;
  }

  async update(componentDto: UpdateComponentDto, id: string) {
    // const layout = componentDto.layout;

    const component = await this.findOne(id, ['layouts']);

    Object.assign(component.layouts, componentDto.layout);
    Object.assign(component, componentDto.component);

    await this.layoutRepository.save(component.layouts);
    await this.componentsRepository.save(component);
    return component;
  }

  async remove(id: string) {
    await this.componentsRepository.delete(id);
  }
}
