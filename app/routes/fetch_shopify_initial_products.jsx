import { authenticate } from "../utils/shopify.server";
import { FETCH_PRODUCTS_QUERY } from "../queries/fetchProductsShopify";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const query = FETCH_PRODUCTS_QUERY;

  const response = await admin.graphql(query);
  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors.map((err) => err.message).join(", "));
  }

  return new Response(JSON.stringify(data.data.products));
};