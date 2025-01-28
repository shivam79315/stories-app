import {
    saveProductReel,
    deleteProductReel,
    fetchProductReels,
  } from "../services/productReelService";
  
  export const loader = async ({ request }) => {
    const url = new URL(request.url);
    const product_id = url.searchParams.get("productId");
  
    if (!product_id) {
      return new Response(
        JSON.stringify({ success: false, error: "Product ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  
    try {
      const productReels = await fetchProductReels(product_id);
      return new Response(
        JSON.stringify({ success: true, productReels }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, error: "Failed to fetch ProductReels" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  };
  
  export const action = async ({ request }) => {
    const contentType = request.headers.get("Content-Type") || "";
  
    if (!contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid Content-Type. Expected application/json.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  
    try {
      const body = await request.json();
      const { actionType, product_id, reel_id, title, id } = body;
  
      if (actionType === "add") {
        if (!product_id || !reel_id || !title) {
          throw new Error("Missing required fields: productId, reelId, or title");
        }
  
        const productReel = await saveProductReel({ product_id, reel_id, title });
        return new Response(
          JSON.stringify({
            success: true,
            message: "ProductReel added successfully",
            productReel,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
  
      if (actionType === "delete") {
        if (!id) {
          throw new Error("Reel ID is required for deletion");
        }
  
        await deleteProductReel(id);
        return new Response(
          JSON.stringify({
            success: true,
            message: "ProductReel deleted successfully",
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
  
      return new Response(
        JSON.stringify({
          success: false,
          error: `Unsupported actionType: ${actionType}`,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error in action:", error.message);
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  };
  