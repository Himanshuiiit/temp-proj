import { Injectable } from '@nestjs/common';
import { Version } from '../entities/versions.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from '../entities/app.entity';

@Injectable()
export class VersionsService {
  constructor(@InjectRepository(Version) private versionRepository: Repository<Version>) {}

  async createVersion(name: string, app: App): Promise<Version> {
    const version = this.versionRepository.create({ name, appId: app.id });
    version.app = app;
    return await this.versionRepository.save(version);
  }

  async getVersion(id: string, relations: string[] = []): Promise<Version> {
    if (!id) return null;

    const version = await this.versionRepository.findOne({
      where: {
        id,
      },
      relations: relations,
    });

    for (const page in version.pages) {
      for (const component in version.pages[page]?.components) {
        delete version.pages[page].components[component]?.layouts?.component;
        delete version.pages[page].components[component]?.page;
      }
      delete version.pages[page].version;
    }
    return version;
  }

  async getVersions(appId: string) {
    return await this.versionRepository.find({
      where: {
        appId,
      },
    });
  }

  async updateVersion(versionId: string, versionData: Partial<Version>){
    const version = await this.getVersion(versionId)
    Object.assign(version, versionData)
    this.versionRepository.save(version)
  }

  async deleteVersion(id: string) {
    return await this.versionRepository.delete(id);
  }
}
