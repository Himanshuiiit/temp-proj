import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(coxtext: ExecutionContext): boolean {
    const req = coxtext.switchToHttp().getRequest();
    return req.session?.user;
  }
}
