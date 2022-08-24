import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';
import { eventContext } from '@vendia/serverless-express/src/middleware';
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { delay } from 'bluebird';
import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';
let server: Handler;
let initFlag = false;
export async function useMiddleware(app: INestApplication): Promise<void> {
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(helmet());
  app.use(compression());
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap(): Promise<Handler> {
  if (server) return server;
  if (initFlag) {
    return delay(333).then(() => bootstrap());
  }
  initFlag = true;
  const expressApp = express();
  const adapter: any = new ExpressAdapter(expressApp);
  const nestApp = await NestFactory.create(AppModule, adapter);
  await useMiddleware(nestApp);
  nestApp.use(eventContext());
  await nestApp.init();
  server = serverlessExpress({
    app: expressApp,
    binarySettings: { contentTypes: [] },
  });
  return server;
}

export const handler: Handler = async (
  event: APIGatewayEvent | any,
  context: Context,
  callback: Callback,
): Promise<any> => {
  const server = await bootstrap();
  return server(event, context, callback);
};

process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection:', reason);
});

process.on('uncaughtException', (reason) => {
  console.error('uncaughtException:', reason);
});
