import { App } from '@aws-cdk/core';
import { str } from 'env-var-provider';
import { setDotEnv } from '../src/utils/set-dot-env';
import { CdkStack } from './cdk-stack';
setDotEnv();

const AWS_CDK_APP_NAME = str('AWS_CDK_APP_NAME', {
  isRequired: true,
  description: 'Application name of AWS Cloud Development Kit(CDK)',
  defaultValue: 'nest-lambda-poc',
});
const AWS_DEFAULT_REGION = str('AWS_DEFAULT_REGION', { isRequired: true });
const CDK_DEFAULT_ACCOUNT = str('CDK_DEFAULT_ACCOUNT', { isRequired: true });
console.log({
  AWS_CDK_APP_NAME,
  AWS_DEFAULT_REGION,
  CDK_DEFAULT_ACCOUNT,
});
const app = new App();
new CdkStack(app, AWS_CDK_APP_NAME, {
  env: {
    region: AWS_DEFAULT_REGION,
  },
});
