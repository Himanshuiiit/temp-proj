import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AppOwnerGuard implements CanActivate {
  constructor() {}

  async canActivate(coxtext: ExecutionContext): Promise<boolean> {
    const req = coxtext.switchToHttp().getRequest();
    const appId = req.body.appId;
    return req.currentUser.ownedApps.some((app) => app.id === appId);
  }
}
