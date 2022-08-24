import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { APIGatewayEvent, Context } from 'aws-lambda';

export const LambdaContext = createParamDecorator(
  (none: any, ctx: ExecutionContext): Context => {
    try {
      let req = ctx.switchToHttp().getRequest();
      return req?.apiGateway?.context;
    } catch (err) {
      return null;
    }
  },
);

export const LambdaEvent = createParamDecorator(
  (none: any, ctx: ExecutionContext): APIGatewayEvent => {
    try {
      let req = ctx.switchToHttp().getRequest();
      return req?.apiGateway?.event;
    } catch (err) {
      return null;
    }
  },
);
