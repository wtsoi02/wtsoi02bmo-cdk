#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyEc2Stackwtsoi01 } from '../lib/my-ec2-stack';

const app = new cdk.App();
new MyEc2Stackwtsoi01(app, 'MyEc2Stackwtsoi01', {
env: { account: '992382386705', region: 'us-east-1'},

});