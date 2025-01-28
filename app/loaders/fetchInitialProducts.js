import { authenticate } from "../utils/shopify.server";
import { json } from "@remix-run/node";
import { FETCH_PRODUCTS_QUERY } from "../queries/fetchProductsShopify";

export const fetch_initial_products = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const query = FETCH_PRODUCTS_QUERY;

  const response = await admin.graphql(query);
  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors.map((err) => err.message).join(", "));
  }

  return json(data.data.products);
};