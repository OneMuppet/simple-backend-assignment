import { readBrand, readBrands } from '../libs/brandRepo';
import { ok } from '../response';

export const handler = async (event: AWSLambda.APIGatewayEvent): Promise<AWSLambda.APIGatewayProxyResult> => {
  if (event.pathParameters.brand) {
    console.log(`Getting brand ${event.pathParameters.brand}`);
    const data = await readBrand(event.pathParameters.brand);
    return ok(data.Items[0]);
  } else {
    const data = await readBrands();
    return ok(data.Items);
  }
};
