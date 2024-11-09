import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { json, urlencoded } from 'express';
import { json, urlencoded } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
  });
  // Increase the maximum payload size
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  await app.listen(3000);
}
bootstrap();
