#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from './cdk-stack';

const app = new cdk.App();
new CdkStack(app, 'nest-lambda-poc', {
  env: {},
});
