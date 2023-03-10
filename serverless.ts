import type { AWS } from '@serverless/typescript';
import functions from './config/functions';
import iam from './config/iam';
import resources from './config/resources';

const serverlessConfiguration: AWS = {
  service: 'brands-counter',
  frameworkVersion: '3',
  variablesResolutionMode: '20210326',
  custom: {
    'serverless-offline': {
      noAuth: true,
      s: 'test',
    },
    prune: {
      automatic: true,
      number: 2,
    },
  },
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-prune-versions'],
  provider: {
    profile: 'todo-set-to-aws-profile',
    region: 'eu-north-1',
    architecture: 'arm64',
    httpApi: {
      cors: true,
      // authorizers: {
      //   customAuthorizer: {
      //     name: 'authorizer',
      //     functionArn: '${self:provider.environment.AUTHORIZER}',
      //     type: 'request',
      //     resultTtlInSeconds: 3600,
      //     enableSimpleResponses: true,
      //     payloadVersion: '2.0',
      //     identitySource: '$request.header.Authorization',
      //   },
      // },
    },
    deploymentBucket: {
      name: '${file(config/env.yml):${self:provider.stage}.AWS_ACCOUNT}.eu-north-1.serverless.deploys',
    },
    name: 'aws',
    runtime: 'nodejs18.x',
    stage: '${opt:stage, "test"}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: '${file(config/env.yml):${self:provider.stage}}' as any,
    lambdaHashingVersion: '20201221',
    iam,
  },
  functions,
  resources,
  package: {
    individually: true,
  },
};

module.exports = serverlessConfiguration;
