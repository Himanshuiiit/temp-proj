import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ComponentsService } from '../components.service';

@Injectable()
export class AppComponentGuard implements CanActivate {
  constructor(private componentsService: ComponentsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const id = request.body.componentId;
    const appId = request.body.appId;
    // console.log('id', id);
    const component = await this.componentsService.findOne(id);
    // console.log('component', component);
    return component.appId === appId;
  }
}
