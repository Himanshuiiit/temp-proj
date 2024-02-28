import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
  
    // Check if session has user
    // console.log(req.session)
    if (req.session && req.session?.user) {
      // create new expiry for cookie
      // const oneDayFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000);
      // req.session.expires = oneDayFromNow;

      // find user and attach to request
      const user = await this.usersService.findOne(req.session.user, ['ownedApps', 'apps']);
      if (!user) req.session.user = null;
      else req.currentUser = user;
    }
    next();
  }
}
