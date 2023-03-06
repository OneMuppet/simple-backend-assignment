import { handler } from '@/functions/brandDatabaseUpdater';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const ddbMock = mockClient(DynamoDBDocumentClient);

describe('Brand reader', () => {
  beforeAll(() => {
    ddbMock.reset();
  });

  it('Should increment brands.', async () => {
    ddbMock.on(UpdateCommand).resolves({});
    // Handler input
    const event = {
      Records: [
        {
          body: 'Volvo',
        },
        {
          body: 'Volvo',
        },
        {
          body: 'Renault',
        },
      ],
    } as any;

    await handler(event);
    const ddbCalls = ddbMock.commandCalls(UpdateCommand);
    expect(ddbCalls[0].firstArg.input.Key.name).toEqual('VOLVO');
    expect(ddbCalls[1].firstArg.input.Key.name).toEqual('VOLVO');
    expect(ddbCalls[2].firstArg.input.Key.name).toEqual('RENAULT');
  });
});
