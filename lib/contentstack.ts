import Contentstack from "contentstack";

// Using the actual keys provided instead of treating them as process.env props
const apiKey = process.env.CONTENTSTACK_API_KEY || "bltc7d7f5aba6e6d5a4";
const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN || "cs2540af18c2ee848c976873cd";
const environment = process.env.CONTENTSTACK_ENVIRONMENT || "development";

function createQueryStub(): any {
  return {
    includeReference: () => createQueryStub(),
    where: () => createQueryStub(),
    toJSON: () => createQueryStub(),
    find: async () => [[], []],
  };
}

const Stack = apiKey && deliveryToken
  ? Contentstack.Stack({ api_key: apiKey, delivery_token: deliveryToken, environment })
  : {
      ContentType: () => ({ Query: createQueryStub }),
    };

export { Stack };
