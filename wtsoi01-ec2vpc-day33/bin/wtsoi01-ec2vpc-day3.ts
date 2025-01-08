#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Wtsoi01Ec2VpcDay3Stack } from '../lib/wtsoi01-ec2vpc-day3-stack';

const app = new cdk.App();
new Wtsoi01Ec2VpcDay3Stack(app, 'Wtsoi01Ec2VpcDay3Stack', {
 
  env: { account: '992382386705', region: 'us-east-1' },

});