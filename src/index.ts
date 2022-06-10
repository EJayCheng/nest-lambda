import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import createServer from '@vendia/serverless-express';
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { eventContext } from 'aws-serverless-express/middleware';
import * as compression from 'compression';
import * as express from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';

let binaryMimeTypes: string[] = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
];

let server: Handler;

async function bootstrap(): Promise<Handler> {
  if (server) return server;
  const expressApp = express();
  const adapter: any = new ExpressAdapter(expressApp);
  const nestApp = await NestFactory.create(AppModule, adapter);
  nestApp.useGlobalPipes(new ValidationPipe());
  nestApp.enableCors();
  nestApp.use(eventContext());
  nestApp.use(helmet());
  nestApp.use(compression());
  await nestApp.init();
  server = createServer({ app: expressApp, binaryMimeTypes });
  return server;
}

export const handler: Handler = async (
  event: APIGatewayEvent | any,
  context: Context,
  callback: Callback,
): Promise<any> => {
  if (event?.path === '/swagger') {
    event.path = '/swagger/';
  }
  if (event?.path?.includes('swagger-ui')) {
    event.path = `/swagger${event?.path}`;
  }

  const server = await bootstrap();
  return server(event, context, callback);
};
