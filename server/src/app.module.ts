import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from 'db/data-source';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AppsModule } from './apps/apps.module';
import { ComponentsModule } from './components/components.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
// import * as cookieSession from 'cookie-session';
const cookieSession = require('cookie-session')
import * as parser from 'cookie-parser'

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    AuthModule,
    AppsModule,
    ComponentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('secret')],
          maxAge: 24 * 60 * 60 * 1000,
          secure: false,
        })
      )
      .forRoutes('*');
  }

  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(
  //       parser(this.configService.get('secret'))
  //     )
  //     .forRoutes('*')
  // }

}
