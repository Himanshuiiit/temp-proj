import { Injectable } from '@nestjs/common';
import { Page } from '../entities/pages.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePageDto } from '../dto/update-page.dto';
import { CreatePageDto } from '../dto/create-page.dto';
import { VersionsService } from '../versions/versions.service';
import { Version } from '../entities/versions.entity';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page) private pageRepository: Repository<Page>,
    private versionsService: VersionsService
  ) {}

  async createPage(versionId: string, page: CreatePageDto, appId: string): Promise<Page> {
    const version = await this.versionsService.getVersion(versionId);
    if (!version) return null;

    const newPage = this.pageRepository.create({ ...page, appId, version });

    return this.pageRepository.save(newPage);
  }

  async getPage(id: string, relations: string[] = []): Promise<Page> {
    if (!id) return null;

    const page = await this.pageRepository.findOne({
      where: {
        id,
      },
      relations: relations,
    });

    return page;
  }

  async clonePage(version: Version, page: Page, appId: string) {}

  async updatePage(id: string, page: UpdatePageDto) {
    return this.pageRepository.update(id, page);
  }

  async deletePage(id: string) {
    return this.pageRepository.delete(id);
  }
}
