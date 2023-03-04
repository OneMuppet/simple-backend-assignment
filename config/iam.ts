const statements = [
  {
    Effect: 'Allow',
    Action: [
      'xray:PutTraceSegments',
      'xray:PutTelemetryRecords',
    ],
    Resource: [
      '*',
    ],
  },
  {
    Effect: 'Allow',
    Action: [
      's3:GetObject',
    ],
    Resource: 'arn:aws:s3:::${self:provider.environment.S3}-${self:provider.environment.STAGE}/*',
  },
  {
    Effect: 'Allow',
    Action: [
      'dynamodb:UpdateItem',
      'dynamodb:Scan',
      'dynamodb:Query',
    ],
    Resource: 'arn:aws:dynamodb:*:*:table/${self:provider.environment.ASSET_NAME}',
  },
  {
    Effect: 'Allow',
    Action: [
      'sqs:SendMessage',
    ],
    Resource: 'arn:aws:sqs:*:*:vehicleBrandSQS',
  },
];

export default {
  role: {
    statements,
  },
};
