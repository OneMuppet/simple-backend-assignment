import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { S3EventRecord } from 'aws-lambda';

const client = new S3Client({});

export const getBrandsFromS3 = async (record: S3EventRecord): Promise<string[]> => {
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
    return brands;
  } catch (err) {
    console.error(err);
  }
};
