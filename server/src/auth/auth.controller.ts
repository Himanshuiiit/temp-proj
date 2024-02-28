import { Controller, Get, Req, Res, Session, UseGuards, Param, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { AuthGuard } from '../guards/auth.guard';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/users.entity';

@Controller('auth')
export class AuthController {

  sessionData: {
    id: uuidv4,
    userId: uuidv4
  }[] = []

  constructor(
    private authService: AuthService,
    private configService: ConfigService
    ) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    // sing in user using details from google sso
    const user = await this.authService.signIn(req.user);
    
    const token = uuidv4()
    this.sessionData = this.sessionData.filter(session => session.userId !== user.id)
    this.sessionData.push({
      id: token,
      userId: user.id
    })

    const url = this.configService.get("NODE_ENV")==="production"?
    this.configService.get('FRONTEND_URL_PROD'):this.configService.get('FRONTEND_URL_DEV')

    return res.send(`
    <html>
      <head>
        <meta http-equiv="refresh" content="0;url=${url}?token=${token}">
      </head>
      <body>
        Redirecting...
      </body>
    </html>
  ` )

  }

  @Get('/getsession/:token')
  GetSession(@Param('token') token: uuidv4,@Session() session: any, @Res() res: any){
    const tokenData = this.sessionData.filter(session => session.id === token)
    if(tokenData.length === 1)
    {
      session.user = tokenData[0].userId
      
      this.sessionData = this.sessionData.filter(session => session.id !== token)
  
      return res.status(200).send("session found")
    }
    return res.status(404).send("session not found")
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  async logout(@Session() session: any, @Res() res: Response) {
    session.user = null;
    return res.status(200).send({ message: 'Logged out' });
  }

  @Get('/demoSession')
  async demo(@Session() session: any, @Res() res: any){
    if(this.configService.get("NODE_ENV") === 'production')
      throw new UnauthorizedException('Not allowed in production')

    const user = await this.authService.signIn({
      name: 'demo',
      email: 'demo@demo.com'
    } as User);

    session.user = user.id

    return res.status(200).send("demo session set")
  }

}
