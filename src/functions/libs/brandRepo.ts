import { UpdateCommand, UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '@/functions/libs/dynamodb';

export const incrementBrand = async (brand: string, increment: number): Promise<UpdateCommandOutput> => {
  // Set the parameters.
  const params = {
    TableName: process.env.ASSET_NAME,
    Key: {
      name: brand.toUpperCase(),
    },
    UpdateExpression: 'ADD #counter :increment',
    ExpressionAttributeNames: {
      '#counter': 'counter',
    },
    ExpressionAttributeValues: {
      ':increment': increment,
    },
  };
  try {
    console.log(JSON.stringify(params, null, 2));
    const data = await ddbDocClient.send(new UpdateCommand(params));
    console.log('Success - item added or updated', data);
    return data;
  } catch (err) {
    console.log('Error', err);
  }
};

