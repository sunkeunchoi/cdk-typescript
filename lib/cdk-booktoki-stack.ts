import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime, Architecture, Code } from 'aws-cdk-lib/aws-lambda';
import * as path from "path";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkBooktokiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const handler = new NodejsFunction(this, "htmlParser", {
      functionName: "booktoki",
      runtime: Runtime.NODEJS_16_X,
      // architecture: Architecture.ARM_64, // ap-northeast-2 not supported yet
      timeout: cdk.Duration.seconds(30),
      entry: path.join(__dirname, "../src/index.ts"),
      handler: "booktokiHandler",
      memorySize: 512,
      environment: {}

    })
  }
}
