import { readBrand, readBrands } from '../libs/brandRepo';
import { ok } from '../response';

export const handler = async (event: AWSLambda.APIGatewayEvent): Promise<AWSLambda.APIGatewayProxyResult> => {

  if (event.pathParameters?.brand) {
    // Get specific brand
    console.log(`Getting brand ${event.pathParameters.brand}`);
    const brand = await readBrand(event.pathParameters.brand);
    return ok(brand);
  } else {
    // Get All Brands
    console.log('Getting ALL brands');
    const brands = await readBrands();
    return ok(brands);
  }
};
