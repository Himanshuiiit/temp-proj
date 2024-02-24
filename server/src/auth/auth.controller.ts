import { Controller, Get, Req, Res, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Session() session: any, @Res() res: Response) {
    // sing in user using details from google sso
    const user = await this.authService.signIn(req.user);

    // set session to user id
    session.user = user.id;
    res.cookie('session', session);
    return res.redirect(process.env.FRONTEND_URL_DEV);
    // return res.status(200).send({ message: 'Logged in' });
    // return res.redirect('ec2-13-233-118-100.ap-south-1.compute.amazonaws.com/api/users')
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  async logout(@Session() session: any, @Res() res: Response) {
    session.user = null;
    return res.status(200).send({ message: 'Logged out' });
  }
}
