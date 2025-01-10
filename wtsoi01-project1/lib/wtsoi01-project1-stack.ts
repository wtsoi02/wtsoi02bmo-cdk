import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';

export class Wtsoi01Project1Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
// dynamodb code
    const table = new dynamodb.Table(this, 'Wtsoi01DynamoDB', {
      tableName: 'wtsoi01-dynamodb',
      partitionKey: { name: 'BucketName', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });
    const wtsoi01SampleFunction = new lambda.Function(this, 'Wtsoi01SampleFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'index.handler',
      functionName: 'wtsoi01-sample-function',
      code: lambda.Code.fromInline(`
import time
import boto3
import os

dynamodb = boto3.resource('dynamodb')
table_name = os.environ['DYNAMODB_TABLE_NAME']
table = dynamodb.Table(table_name)

def handler(event, context):
    s3 = boto3.client('s3')
    response = s3.list_buckets()
    buckets = [bucket['Name'] for bucket in response['Buckets']]
    print("S3 Buckets:", buckets)
    
    for bucket in buckets:
      table.put_item(Item={'BucketName': bucket})
    
    return {
      'statusCode': 200,
      'body': 'S3 Buckets: ' + ', '.join(buckets)
    }`),
      environment: {
      DYNAMODB_TABLE_NAME: table.tableName,
      },
    });
    wtsoi01SampleFunction.addToRolePolicy(new iam.PolicyStatement({
      actions: ['s3:ListAllMyBuckets'],
      resources: ['*'],
    }));

    table.grantWriteData(wtsoi01SampleFunction);
    const rule = new events.Rule(this, 'Rule', {
      schedule: events.Schedule.rate(cdk.Duration.minutes(3)),
    });

    rule.addTarget(new targets.LambdaFunction(wtsoi01SampleFunction));
  }
}
