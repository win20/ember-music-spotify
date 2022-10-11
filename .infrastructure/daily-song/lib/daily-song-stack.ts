import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
require('dotenv').config();

export class DailySongStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const setDailySongLambda = new lambda.Function(this, 'setDailySong', {
      functionName: 'setDailySong',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambdas'),
      handler: 'setDailySong.handler',
      environment: {
        region: process.env.REGION as string,
        dailySongTable: process.env.DAILY_SONG_TABLE as string,
      },
    });

    const eventRule = new events.Rule(this, 'scheduleRule', {
      schedule: events.Schedule.cron({ minute: '0', hour: '10' }),
    });
    eventRule.addTarget(new targets.LambdaFunction(setDailySongLambda));

    const table = new dynamodb.Table(this, 'daily-song', {
      tableName: 'daily-song-table',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    table.grantFullAccess(setDailySongLambda);

    const getDailySongLambda = new lambda.Function(this, 'getDailySong', {
      functionName: 'getDailySong',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambdas'),
      handler: 'getDailySong.handler',
      environment: {
        region: process.env.REGION as string,
        dailySongTable: process.env.DAILY_SONG_TABLE as string,
      },
    });

    table.grantReadData(getDailySongLambda);

    const api = new apigw.RestApi(this, 'ember-music-api', {
      restApiName: 'emberMusicAPI',
    });

    const getDailySongRoute = api.root.addResource('getDailySong');
    getDailySongRoute.addMethod(
      'GET',
      new apigw.LambdaIntegration(getDailySongLambda)
    );
  }
}
