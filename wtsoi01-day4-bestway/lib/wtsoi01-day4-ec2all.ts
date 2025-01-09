import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class Wtsoi01Day4ec2all extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
        //using default vpc
        const vpc = ec2.Vpc.fromLookup(this,'wtsoi01vpc',{
            isDefault: true
          });

          // create security group
          const securityGroup = new ec2.SecurityGroup(this, 'wtsoi01SecurityGroup', {
            vpc,
            allowAllOutbound: true,
            securityGroupName: 'wtsoi01-sg'
          });
          // allow inbound traffic on port 22 (SSH) from anywhere
          securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'allow SSH access from anywhere');
      
          // allow inbound traffic on port 80 (HTTP) from anywhere
          securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'allow HTTP access from anywhere');
        // allow inbound traffic on port 443 (HTTPS) from anywhere
        securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'allow HTTPS access from anywhere');
         
        // creating ec2 instance
          const wtsoi01vm = new ec2.Instance(this,'wtsoi01vm1',{
            vpc,
            instanceType: new ec2.InstanceType('t2.micro'),
            machineImage: new ec2.AmazonLinuxImage(),
            keyPair: ec2.KeyPair.fromKeyPairName(this,'wtsoi01key','splunk-key'),
            instanceName: 'wtsoi01-linux-vm',
            securityGroup: securityGroup // attach security group to instance
      
          });
      

  }
}
