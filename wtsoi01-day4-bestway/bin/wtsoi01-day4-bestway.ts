#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Wtsoi01Day4BestwayStack } from '../lib/wtsoi01-day4-bestway-stack';
import { Wtsoi01Day4ec2all } from '../lib/wtsoi01-day4-ec2all';

const app = new cdk.App();
new Wtsoi01Day4BestwayStack(app, 'Wtsoi01Day4BestwayStack', {

  env: { account: '992382386705', region: 'us-east-1' },
  


});

new Wtsoi01Day4ec2all(app, 'Wtsoi01Day4ec2all', {

  env: { account: '992382386705', region: 'us-east-1' },
  


});