import { SendMessageCommandInput, SendMessageCommandOutput, SQSClient } from '@aws-sdk/client-sqs';
import { SendMessageCommand } from '@aws-sdk/client-sqs';

const sqsClient = new SQSClient({ region: 'eu-north-1' });

export const sendMessage = async (brand: string): Promise<SendMessageCommandOutput> => {
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
