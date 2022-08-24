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
const AWS_ACCESS_KEY_ID = str('AWS_ACCESS_KEY_ID', { isRequired: true });
const AWS_DEFAULT_REGION = str('AWS_DEFAULT_REGION', { isRequired: true });
console.log({
  AWS_CDK_APP_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_DEFAULT_REGION,
});
const app = new App();
new CdkStack(app, AWS_CDK_APP_NAME, {
  env: {
    region: AWS_DEFAULT_REGION,
  },
});
