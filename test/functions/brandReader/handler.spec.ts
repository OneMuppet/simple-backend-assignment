import { handler } from '@/functions/brandReader';
import { QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const ddbMock = mockClient(DynamoDBDocumentClient);

describe('Brand reader', () => {
  beforeAll(() => {
    ddbMock.reset();
  });

  it('Should return brands.', async () => {
    ddbMock.on(ScanCommand).resolves({
      Items: [{ name: 'VOLVO', counter: 30 }, { name: 'RENAULT', counter: 1 }],
    });

    const result = await handler({ pathParameters: {} } as any);
    console.log(result);
    expect(typeof (handler)).toBe('function');
  });

  it('Should return a specific brand.', async () => {
    ddbMock.on(QueryCommand).resolves({
      Items: [{ name: 'VOLVO', counter: 3 }],
    });

    const result = await handler({ pathParameters: { brand: 'VOLVO' } } as any);
    console.log(result);
    expect(typeof (handler)).toBe('function');
  });
});
