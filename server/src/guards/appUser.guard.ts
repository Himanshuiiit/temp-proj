import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AppsService } from 'src/apps/apps.service';

export class AppUserGuard implements CanActivate {
  constructor(private appsService: AppsService) {}

  async canActivate(coxtext: ExecutionContext): Promise<boolean> {
    const req = coxtext.switchToHttp().getRequest();
    const appId = req.body.appId;
    // console.log(req.currentUser.apps)
    return req.currentUser?.apps.some((app) => app.id === appId);
  }
}
