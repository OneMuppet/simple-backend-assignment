import { getBrandsFromS3 } from '../libs/s3';
import { sendMessages } from '../libs/sqs';

export const handler = async (event: AWSLambda.S3Event): Promise<void> => {
  for (const record of event.Records) {
    console.log(record.s3?.object.key);
    try {
      const brands = await getBrandsFromS3(record);
      await sendMessages(brands);
    } catch (ex) {
      console.error(`Error when trying to process file and send to SQS ${ex.message}`);
    }
  }
};
