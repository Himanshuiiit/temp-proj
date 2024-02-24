import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { VersionsService } from '../versions/versions.service';

@Injectable()
export class AppVersionGuard implements CanActivate {
  constructor(private versionsService: VersionsService) {}

  async canActivate(coxtext: ExecutionContext): Promise<boolean> {
    const req = coxtext.switchToHttp().getRequest();

    const appId = req.body.appId;
    const id = req.body.versionId;

    const version = await this.versionsService.getVersion(id);

    if (!version) return false;
    return version.appId === appId;
  }
}
