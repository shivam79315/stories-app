import { useState, useEffect } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { authenticate } from "../utils/shopify.server";
import {
  Spinner,
  Card,
  Layout,
  SkeletonPage,
  SkeletonBodyText,
} from "@shopify/polaris";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import Product from "../components/ProductPage/Product";
import {
  loader as reelsLoader,
  action as reelsAction,
} from "./reelsHandlers/reelHandlers";

import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { UploadProvider } from "./context/UploadProvider";
import { ProductReelProvider } from "./context/ProductReelContext";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

// Server-side Action Handler
export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");

  if (actionType === "upload") {
    return await reelsAction({ request });
  }

  const { admin } = await authenticate.admin(request);
  const { id } = params;
  const fullId = `gid://shopify/Product/${id}`;

  try {
    const productQuery = `#graphql
      query GetProduct {
        product(id: "${fullId}") {
          id
          title
          variants(first: 10) {
            nodes {
              id
              title
            }
          }
          collections(first: 10) {
            nodes {
              id
              title
            }
          }
        }
      }`;

      const themeQuery = `#graphql
      query GetTheme {
        themes(first: 1) {
          edges {
            node {
              id
              name
              role
            }
          }
        }
      }`;

    const productResponse = await admin.graphql(productQuery);
    const themeResponse = await admin.graphql(themeQuery);

    if (!productResponse.ok) {
      throw new Error(`GraphQL request failed with status: ${productResponse.status}`);
    }

    const responseData = await productResponse.json();
    const themeData = await themeResponse.json();

    const product = responseData.data?.product;
    const theme = themeData.data?.themes?.edges[0]?.node;

    if (!product || !theme || theme.role !== "MAIN") {
      throw new Error("Required data is missing or theme is not main");
    }

    const themeId = theme.id.split("/").pop();

    if (!product) {
      throw new Error("Product data is null or undefined");
    }

    // Fetch reels using existing loader logic from reelsHandlers
    const reelsResponse = await reelsLoader();
    const reels = JSON.parse(await reelsResponse.text()).videos;
    return { product, reels, themeId };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Response("Failed to fetch product data.", { status: 500 });
  }
};

// Client-side Component
export default function ProductDetails() {
  const fetcher = useFetcher();
  const [product, setProduct] = useState(null);
  const [themeId, setThemeId] = useState(null);

  useEffect(() => {
    fetcher.submit({}, { method: "post" });
  }, []);

  useEffect(() => {
    if (fetcher.data?.product) {
      setProduct(fetcher.data.product);
      setThemeId(fetcher.data.themeId);
    }
  }, [fetcher.data]);

  return (
      <UploadProvider>
        <ProductReelProvider>
          <AppProvider isEmbeddedApp>
            {!product ? (
              <SkeletonPage backAction>
                <Layout>
                  <Layout.Section>
                    <Card sectioned>
                      <SkeletonBodyText />
                    </Card>
                  </Layout.Section>
                </Layout>
              </SkeletonPage>
            ) : (
              <Product product={product} themeId={themeId} actionUrl="/app/reelslist" />
            )}
          </AppProvider>
        </ProductReelProvider>
      </UploadProvider>
  );
}