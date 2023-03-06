import { SendMessageCommand, SendMessageCommandInput, SendMessageCommandOutput, SQSClient } from '@aws-sdk/client-sqs';

const sqsClient = new SQSClient({ region: 'eu-north-1' });

export const sendMessages = async (brands: string[]): Promise<SendMessageCommandOutput[]> => {
  const sqsPromises = [];
  for (const brand of brands) {
    console.log(`Sending SQS message for ${brand}`);
    sqsPromises.push(sendMessage(brand));
  }
  const result = await Promise.all(sqsPromises);
  return result;
};

const sendMessage = async (brand: string): Promise<SendMessageCommandOutput> => {
  // Set the parameters
  const params: SendMessageCommandInput = {
    MessageBody: brand,
    QueueUrl: `https://sqs.REGION.amazonaws.com/${process.env.AWS_ACCOUNT}/vehicleBrandSQS`,
  };

  try {
    const data = await sqsClient.send(new SendMessageCommand(params));
    console.log('Success, message sent. MessageID:', data.MessageId);
    return data;
  } catch (err) {
    console.log('Error', err);
  }
};
