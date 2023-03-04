export default {
  'brand-reader': {
    handler: 'src/functions/brandReader/index.handler',
    events: [
      {
        httpApi: {
          path: '/brands/{brand}',
          method: 'get',
        },
      },
    ],
  },
  'brand-file-processor': {
    handler: 'src/functions/brandFileProcessor/index.handler',
    events: [
      {
        s3: {
          bucket: '${self:provider.environment.S3}-${self:provider.environment.STAGE}',
          event: 's3:ObjectCreated:*',
          rules: [{ prefix: 'uploads/' }],
        },
      },
    ],
  },
  'brand-database-updater': {
    handler: 'src/functions/brandDatabaseUpdater/index.handler',
    events: [
      {
        sqs: {
          arn: {
            'Fn::GetAtt': ['vehicleBrandSQS', 'Arn'],
          },
        },
      },
    ],
  },
};
