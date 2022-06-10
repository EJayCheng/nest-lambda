import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import {
  AssetCode,
  Function,
  LayerVersion,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { resolve } from 'path';
const RootPath = resolve(__dirname, '..');
const LambdaPath = resolve(RootPath, 'dist');
const NodeModulesLayerPath = resolve(
  RootPath,
  'layers',
  'nodejs',
  'node_modules',
);
export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const nodeModulesLayer = new LayerVersion(this, 'node-modules-layer', {
      compatibleRuntimes: [Runtime.NODEJS_16_X],
      code: new AssetCode(NodeModulesLayerPath),
    });

    const PocFn = new Function(this, 'nest-lambda-poc', {
      runtime: Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: new AssetCode(LambdaPath),
      layers: [nodeModulesLayer],
      timeout: Duration.seconds(30),
      memorySize: 512,
    });

    const ApiGateway = new LambdaRestApi(this, 'nest-lambda-poc-gateway', {
      handler: PocFn,
    });
  }
}
