import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class Wtsoi01Day4BestwayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

// define an array with 2 bucket names
const bucketNames = ['Wtsoi01Day4Bestwaybucket1', 'Wtsoi01Day4Bestwaybucket2'];

for (const bucketName of bucketNames) {
  new cdk.aws_s3.Bucket(this, bucketName, {
    versioned: true,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    autoDeleteObjects: true,
    bucketName: bucketName.toLowerCase()
  });
}

// const bucket = new cdk.aws_s3.Bucket(this, 'MyBucket', {
//   versioned: true,
//   removalPolicy: cdk.RemovalPolicy.DESTROY,
//   autoDeleteObjects: true,
//   bucketName: 'Wtsoi01-day4-bestway-buckettt'
// });

  }
}
