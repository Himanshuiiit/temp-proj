import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PagesService } from '../pages/pages.service';

@Injectable()
export class AppPageGuard implements CanActivate {
  constructor(private pagesService: PagesService) {}

  async canActivate(coxtext: ExecutionContext): Promise<boolean> {
    const req = coxtext.switchToHttp().getRequest();
    const appId = req.body.appId;
    const id = req.body.pageId;
    const page = await this.pagesService.getPage(id);
    if (!page) return false;
    return page.appId === appId;
  }
}
