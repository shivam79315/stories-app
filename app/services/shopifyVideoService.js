import fetch from "node-fetch";
import { FETCH_VIDEOS_QUERY } from "../queries/fetchVideosQuery";

const SHOPIFY_API_URL = "https://reelstestproject.myshopify.com/admin/api/2023-01/graphql.json";
const SHOPIFY_ACCESS_TOKEN = "shpua_bb4a966e9f09ce0127f77eaed6b65dbc";

export const fetchVideosFromShopify = async () => {
  try {
    const response = await fetch(SHOPIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query: FETCH_VIDEOS_QUERY }),
    });

    const data = await response.json();

    if (!response.ok || data.errors) {
      console.error("Shopify API Errors:", data.errors || "Unknown error");
      throw new Error("Failed to fetch video data from Shopify");
    }

    return data.data.files.edges;
  } catch (error) {
    console.error("Error in Shopify API call:", error.message);
    throw error;
  }
};
