import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { AssetCode, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { resolve } from 'path';

const LambdaPath = resolve(__dirname, '..', 'dist');
export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const PocFn = new Function(this, 'nest-lambda-poc', {
      runtime: Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: new AssetCode(LambdaPath),
      timeout: Duration.seconds(30),
      memorySize: 512,
    });

    const ApiGateway = new LambdaRestApi(this, 'nest-lambda-poc-gateway', {
      handler: PocFn,
    });
  }
}
