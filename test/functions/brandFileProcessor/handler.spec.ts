import fs from 'fs';
import { handler } from '@/functions/brandFileProcessor';
import { mockClient } from 'aws-sdk-client-mock';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { SendMessageCommandOutput, SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';

// S3 Mock
const s3ClientMock = mockClient(S3Client);
const s3BodyMock = {
  Body: {
    transformToString: async () => {
      return fs.readFileSync(`${__dirname}/brands.txt`).toString();
    },
  },
} as any;

// SQS Mock
const sqsClientMock = mockClient(SQSClient);
const sqsSendMessageResultMock: SendMessageCommandOutput = {
  $metadata: {},
};

// Tests
describe('Brand file processor', () => {
  beforeAll(() => {
    s3ClientMock.reset();
  });

  it('Should be able to read from S3 and send messages to SQS.', async () => {
    // Mocks
    s3ClientMock.on(GetObjectCommand).resolves(s3BodyMock);
    sqsClientMock.on(SendMessageCommand).resolves(sqsSendMessageResultMock);

    // Handler input
    const records = [
      {
        s3: {
          bucket: { name: 'bucket-name' },
          object: { key: 'object-key' },
        },
      },
    ];

    // Call handler
    await handler({ Records: records } as any);

    // Spy on SQS
    const sqsCalls = sqsClientMock.commandCalls(SendMessageCommand);
    expect(sqsCalls[0].firstArg.input.MessageBody).toEqual('Volvo');
    expect(sqsCalls[1].firstArg.input.MessageBody).toEqual('Volvo');
    expect(sqsCalls[2].firstArg.input.MessageBody).toEqual('Renault');
  });

});
