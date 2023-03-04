import { handler } from '../../../src/functions/brandReader';

describe('Brand reader', () => {
  it('Should be a function.', async () => {
    console.log('test');
    expect(typeof (handler)).toBe('function');
  });
});
