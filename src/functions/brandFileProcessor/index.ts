import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { sendMessage } from '../libs/sqs';

const client = new S3Client({});


export const handler = async (event: AWSLambda.S3Event): Promise<null> => {
  for (const record of event.Records) {
    console.log(record);
    const command = new GetObjectCommand({
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key,
    });

    try {
      const response = await client.send(command);
      const str = await response.Body.transformToString();
      const rows = str.split('\n');

      const hasLettersRegex = /[a-zA-Z]/g;
      const brands = rows.filter(r => hasLettersRegex.test(r));
      const sqsPromises = [];
      for (const brand of brands) {
        console.log(`Sending SQS message for ${brand}`);
        sqsPromises.push(sendMessage(brand));
      }
      const result = await Promise.all(sqsPromises);
      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.error(err);
    }
  }
  return;
};
