import { Controller, Get } from '@nestjs/common';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { AppService } from './app.service';
import { LambdaContext, LambdaEvent } from './decorators/lambda.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  html(): string {
    return this.appService.getHello();
  }

  @Get('json')
  json(): any {
    return { test: this.appService.getHello() };
  }
  @Get('info')
  info(
    @LambdaEvent() event: APIGatewayEvent,
    @LambdaContext() context: Context,
  ): any {
    return { event, context };
  }
}
