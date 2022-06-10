import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule);
  nestApp.useGlobalPipes(new ValidationPipe());
  nestApp.enableCors();
  await nestApp.listen(3000);
}
bootstrap();
