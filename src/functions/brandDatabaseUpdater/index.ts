import { incrementBrand } from '../libs/brandRepo';

export const handler = async (event: AWSLambda.SQSEvent): Promise<null> => {
  console.log(event);
  const result = await incrementBrand('Volvo', 1);
  console.log(result);
  return;
};
