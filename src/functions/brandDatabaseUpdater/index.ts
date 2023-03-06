import { incrementBrand } from '../libs/brandRepo';

export const handler = async (event: AWSLambda.SQSEvent): Promise<void> => {
  for (const record of event.Records) {
    console.log(`Incrementing ${record.body}`);
    await incrementBrand(record.body, 1);
  }
};
