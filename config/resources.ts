import { vehicleBrandDatabase } from './dynamodb';
import { vehicleBrandSQS } from './sqs';

const resources = { vehicleBrandSQS, vehicleBrandDatabase };

export default {
  Resources: resources,
};
