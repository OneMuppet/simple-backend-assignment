export const vehicleBrandDatabase = {
  Type: 'AWS::DynamoDB::Table',
  DeletionPolicy: 'Retain',
  UpdateReplacePolicy: 'Retain',
  Properties: {
    TableName: 'VehicleBrands',
    AttributeDefinitions: [
      {
        AttributeName: 'name',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'name',
        KeyType: 'HASH',
      },
    ],
    PointInTimeRecoverySpecification: {
      PointInTimeRecoveryEnabled: true,
    },
    BillingMode: 'PAY_PER_REQUEST',
  },
};
