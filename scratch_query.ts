import Contentstack from "contentstack";

const apiKey = "bltc7d7f5aba6e6d5a4";
const deliveryToken = "cs2540af18c2ee848c976873cd";
const environment = "development";

const Stack = Contentstack.Stack({ api_key: apiKey, delivery_token: deliveryToken, environment });

async function checkAuthors() {
  try {
    const Query = Stack.ContentType("author").Query();
    const data = await Query.toJSON().find();
    console.log(JSON.stringify(data?.[0], null, 2));
  } catch (err) {
    console.error(err);
  }
}

checkAuthors();
