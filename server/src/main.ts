import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const url = process.env.NODE_ENV==='production'?
  process.env.FRONTEND_URL_PROD:process.env.FRONTEND_URL_DEV
  
  app.enableCors({
    origin: `${url}`,
    credentials: true,
  })

  await app.listen(3000);
}
bootstrap();
