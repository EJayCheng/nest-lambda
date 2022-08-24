import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useMiddleware } from './index';
import { setDotEnv } from './utils/set-dot-env';
setDotEnv();
async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule);
  await useMiddleware(nestApp);
  await nestApp.listen(3000);
}
bootstrap();
