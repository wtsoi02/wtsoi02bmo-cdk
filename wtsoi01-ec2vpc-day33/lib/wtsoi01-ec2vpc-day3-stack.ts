import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class Wtsoi01Ec2VpcDay3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    //using default vpc
    const vpc = ec2.Vpc.fromLookup(this,'wtsoi01vpc',{
      isDefault: true
    });
    // creating ec2 instance
    const wtsoi01vm = new ec2.Instance(this,'wtsoi01vm1',{
      vpc,
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: new ec2.AmazonLinuxImage(),
      keyPair: ec2.KeyPair.fromKeyPairName(this,'wtsoi01key','splunk-key'),
      instanceName: 'wtsoi01-linux-vm'

    });
   
    new cdk.CfnOutput(this,'wtsoi01InstanceID', {
      description: 'this will print instance id',
      value: wtsoi01vm.instanceId
    }); 

    new cdk.CfnOutput(this,'wtsoi01PublicDnS',{
      description: 'this will print PublicDNS Name',
      value: wtsoi01vm.instancePublicDnsName
    }); 
   

  }
}
