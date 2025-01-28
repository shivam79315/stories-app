export const FETCH_PRODUCTS_QUERY = `    
    query {
      products(first: 3) {        
        nodes {
          id
          title
          handle
          status
          vendor
          productType
          totalInventory
          images(first: 1) {
            edges {
              node {
                src
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                inventoryQuantity
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
