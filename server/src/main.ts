import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [process.env.FRONTEND_URL_DEV, process.env.FRONTEND_URL_PROD],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
