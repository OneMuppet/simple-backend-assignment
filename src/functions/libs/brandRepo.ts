import {
  UpdateCommand, UpdateCommandOutput,
  ScanCommand, QueryCommand, QueryCommandOutput, ScanCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '@/functions/libs/dynamodb';

export const incrementBrand = async (brand: string, increment: number): Promise<UpdateCommandOutput> => {
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
    console.log('Error when incrementing', err);
  }
};

export const readBrands = async (): Promise<ScanCommandOutput> => {
  const params = { TableName: process.env.ASSET_NAME };
  try {
    console.log(JSON.stringify(params, null, 2));
    const data = await ddbDocClient.send(new ScanCommand(params));
    console.log('Success - items fetched', data);
    return data;
  } catch (err) {
    console.log('Error', err);
  }
};

export const readBrand = async (brand: string): Promise<QueryCommandOutput> => {
  const params = {
    TableName: process.env.ASSET_NAME,
    KeyConditionExpression: '#name = :brand',
    ExpressionAttributeNames: {
      '#name': 'name',
    },
    ExpressionAttributeValues: {
      ':brand': brand.toUpperCase(),
    },
  };
  try {
    console.log(JSON.stringify(params, null, 2));
    const data = await ddbDocClient.send(new QueryCommand(params));
    console.log('Success - Item fetched', data);
    return data;
  } catch (err) {
    console.log('Error', err);
  }
};
