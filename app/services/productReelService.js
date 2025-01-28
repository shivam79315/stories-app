import prisma from "../utils/db.server";

/**
 * Save a ProductReel in the database.
 * @param {Object} data - The data for the ProductReel.
 * @param {string} data.product_id - The ID of the product.
 * @param {string} data.reel_id - The ID of the reel.
 * @param {string} data.title - The title of the reel.
 * @returns {Promise<Object>} The saved ProductReel.
 */
export async function saveProductReel({ product_id, reel_id, title }) {
  try {
    const productReel = await prisma.productReel.create({
      data: {
        product_id,
        reel_id,
        title,
        created_at: new Date(),
      },
    });
    console.log("ProductReel saved successfully:", productReel);
    return productReel;
  } catch (error) {
    console.error("Error saving ProductReel:", error.message);
    throw new Error("Failed to save ProductReel.");
  }
}

/**
 * Delete a ProductReel from the database.
 * @param {string} id - The ID of the ProductReel to delete.
 * @returns {Promise<Object>} The deleted ProductReel.
 */
export async function deleteProductReel(id) {
  try {
    const productReel = await prisma.productReel.delete({
      where: { id },
    });
    console.log("ProductReel deleted successfully:", productReel);
    return productReel;
  } catch (error) {
    console.error("Error deleting ProductReel:", error.message);
    throw new Error("Failed to delete ProductReel.");
  }
}

/**
 * Fetch ProductReels for a specific product from the database.
 * @param {string} product_id - The ID of the product.
 * @returns {Promise<Array>} A list of ProductReels.
 */
export async function fetchProductReels(product_id) {
  try {
    const productReels = await prisma.productReel.findMany({
      where: { product_id },
      include: { reel: true }, 
    });
    
    return productReels;
  } catch (error) {
    console.error("Error fetching ProductReels:", error.message);
    throw new Error("Failed to fetch ProductReels.");
  }
}