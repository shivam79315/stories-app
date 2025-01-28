import { authenticate } from "../utils/shopify.server";

export const action = async ({ request }) => {
  console.log(request);
  const { admin } = await authenticate.admin(request);
  const { cursor, type, query } = await request.json();
  const fetchingProductsCount = 3;

  let paginationDirection = 
  type === "next" ? `first: ${fetchingProductsCount}, after: "${cursor || ""}"` :
  type === "previous" ? `last: ${fetchingProductsCount}, before: "${cursor || ""}"` :
  `first: ${fetchingProductsCount}`;

  const searchQuery = query ? `query: "title:${query}*"` : "";

  // Combine paginationDirection and searchQuery dynamically
  const finalQuery = [paginationDirection, searchQuery].filter(Boolean).join(", ");

  const gqlQuery = `
    query {
      products(${finalQuery}) {
        nodes {
          id
          title
          status
          totalInventory
          images(first: 1) {
            edges {
              node {
                src
                altText
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  `;

  try {
    const response = await admin.graphql(gqlQuery);
    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors.map((err) => err.message).join(", "));
    }

    return new Response(JSON.stringify(data.data.products));
  } catch (error) {
    console.error("GraphQL Query Error:", error);
    throw new Error("An error occurred while fetching products.");
  }
};
