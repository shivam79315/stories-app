import { prisma } from "../utils/db.server.js"; // Adjust the import path based on your project structure

/**
 * Fetch session details based on shop URL.
 * 
 * @param {string} shopURL - The shop URL to query.
 * @returns {Promise<Object|null>} - The session details if found, or null if not found.
 */
export async function fetchSessionByShopURL(shopURL) {
  try {
    if (!shopURL) {
      throw new Error("shopURL is required to fetch session details.");
    }

    const session = await prisma.session.findUnique({
      where: {
        shop: shopURL, 
      },
    });

    if (!session) {
      console.warn(`No session found for shop URL: ${shopURL}`);
      return null;
    }

    console.log(`Session fetched successfully for shop URL: ${shopURL}`, session);
    return session;
  } catch (error) {
    console.error(`Error fetching session for shop URL: ${shopURL}`, error.message);
    throw new Error("Failed to fetch session details.");
  }
}