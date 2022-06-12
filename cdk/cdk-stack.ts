import { LambdaRestApi } from '@aws-cdk/aws-apigateway';
import { Code, Function, LayerVersion, Runtime } from '@aws-cdk/aws-lambda';
import { App, Duration, Stack, StackProps } from '@aws-cdk/core';
import { resolve } from 'path';
const RootPath = resolve(__dirname, '..');
const LambdaPath = resolve(RootPath, 'dist');
const NodeModulesLayerPath = resolve(RootPath, 'layer');
console.log({ LambdaPath, NodeModulesLayerPath });
export class CdkStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const nodeModulesLayer = new LayerVersion(this, 'node-modules-layer', {
      compatibleRuntimes: [Runtime.NODEJS_14_X, Runtime.NODEJS_16_X],
      code: Code.fromAsset(NodeModulesLayerPath),
      description: 'Nestjs Api Handler Dependencies',
    });

    const PocFn = new Function(this, 'nest-lambda-poc', {
      runtime: Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: Code.fromAsset(LambdaPath, {
        exclude: ['node_modules'],
      }),
      layers: [nodeModulesLayer],
      timeout: Duration.seconds(30),
      memorySize: 512,
      description: 'Nestjs Api Handler',
      environment: {},
    });

    const ApiGateway = new LambdaRestApi(this, 'nest-lambda-poc-gateway', {
      handler: PocFn,
    });
  }
}
