import * as cdk from 'aws-cdk-lib';
import { MachineImage } from 'aws-cdk-lib/aws-ec2';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MyEc2Stackwtsoi01 extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const vpc = ec2.Vpc.fromLookup(this,'ExistingVPC', {
        isDefault: true
    });
    const wtsoi01instance = new ec2.Instance(this, 'wtsoi01machine',{
      vpc,
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: new ec2.AmazonLinuxImage(),
      keyName: 'splunk-key',
    });
      

  }
}
