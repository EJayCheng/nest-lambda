import { LambdaRestApi } from '@aws-cdk/aws-apigateway';
import { DockerImageCode, DockerImageFunction } from '@aws-cdk/aws-lambda';
import { App, Duration, Stack, StackProps } from '@aws-cdk/core';
import { resolve } from 'path';
const RootPath = resolve(__dirname, '..');

export class CdkStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const PocFn = new DockerImageFunction(this, 'nest-lambda-poc', {
      code: DockerImageCode.fromImageAsset(RootPath, {
        cmd: ['index.handler'],
        entrypoint: ['/lambda-entrypoint.sh'],
      }),
      timeout: Duration.seconds(30),
      memorySize: 512,
      description: 'Nestjs Api Handler',

      // environment: {},
    });

    const ApiGateway = new LambdaRestApi(this, 'nest-lambda-poc-gateway', {
      handler: PocFn,
    });
  }
}
