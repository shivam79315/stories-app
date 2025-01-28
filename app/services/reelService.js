import prisma from "../utils/db.server";

/**
 * Save reels in the database.
 */
export async function saveReel({ reel_id, shop_url, file_name, reel_url, reel_size, created_at }) {
  try {
    const reel = await prisma.reel.create({
      data: {
        reel_id,
        shop_url,
        file_name,
        reel_url,
        reel_size,
        created_at,
      },
    });
    console.log("Reel saved successfully:", reel);
    return reel;
  } catch (error) {
    console.error("Error saving reel:", error);
    throw new Error("Failed to save reel data");
  }
}


/**
 * Delete a reel from the database as well as from Shopify files
 * @param {string} id - The ID of the reel to delete.
 */

// deleting reel from database
export async function deleteReel(ids) {
 
  try {
    if (Array.isArray(ids)) {
      // Handle multiple IDs
      const reels = await prisma.reel.deleteMany({
        where: {
          id: { in: ids }, // Use `in` for multiple IDs
        },
      });
      console.log("Reels deleted successfully:", reels);
      return reels;
    } else {
      // Handle single ID
      const reel = await prisma.reel.delete({
        where: {
          id: ids, // Single ID
        },
      });
      console.log("Reel deleted successfully:", reel);
      return reel;
    }
  } catch (error) {
    console.error("Error deleting reel(s):", error);
    throw new Error("Failed to delete reel(s)");
  }
}

// deleting reel from shopify
export const deleteVideosFromShopify = async (ids, admin) => {
  try {
    const mutationQuery = `
      mutation fileDelete($input: [ID!]!) {
      fileDelete(fileIds: $input) {
        deletedFileIds
        userErrors {
          field
          message
        }
      }
    }
    `;

    // Execute the mutation
    const response = await admin.graphql(mutationQuery, {
      variables: {
        input: ids,
      },
    });  

    const { deletedFileIds, userErrors } = response || {};

    if (userErrors && userErrors.length > 0) {
      const errorMessages = userErrors
        .map((e) => `${e.field || "Unknown field"}: ${e.message}`)
        .join(", ");
      throw new Error(`Some files could not be deleted: ${errorMessages}`);
    }
    return { success: true, deletedFileIds };
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch reels from the database.
 * @returns {Promise<Array>} A list of reels from the database.
 */
export async function fetchReelsFromDB() {
  try {
    const reels = await prisma.reel.findMany({
      select: {
        id: true,
        reel_id: true,
        shop_url: true,
        file_name: true,
        reel_url: true,
        reel_size: true,
        created_at: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return reels;
  } catch (error) {
    console.error("Error fetching reels from database:", error.message);
    throw new Error("Failed to fetch reels from the database.");
  }
}

