import { incrementBrand } from '../libs/brandRepo';

export const handler = async (event: AWSLambda.SQSEvent): Promise<void> => {
  console.log(event);
  for (const record of event.Records) {
    const result = await incrementBrand(record.body, 1);
    console.log(result);
  }
};
