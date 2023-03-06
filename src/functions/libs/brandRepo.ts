import {
  UpdateCommand, UpdateCommandOutput,
  ScanCommand, QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '@/functions/libs/dynamodb';
import { iBrand } from '@/types';

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

export const readBrands = async (): Promise<iBrand[]> => {
  const params = { TableName: process.env.ASSET_NAME };
  try {
    console.log(JSON.stringify(params, null, 2));
    const data = await ddbDocClient.send(new ScanCommand(params));
    console.log(`Success - items fetched ${JSON.stringify(data, null, 2)}`);
    return data.Items as iBrand[];
  } catch (ex) {
    console.log(`Error when fetching all brands ${ex.message}`);
  }
};

export const readBrand = async (brand: string): Promise<iBrand> => {
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
    console.log(`Success - items fetched ${JSON.stringify(data, null, 2)}`);
    return data.Items[0] as iBrand;
  } catch (ex) {
    console.log(`Error when fetching brand ${ex.message}`);
  }
};
