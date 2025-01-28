import { authenticate } from "../../utils/shopify.server";
import { uploadVideoToShopify } from "../../services/videoUpload";
import {
  deleteReel,
  fetchReelsFromDB,
  deleteVideosFromShopify,
} from "../../services/reelService";

export const loader = async () => {
  try {
    const reels = await fetchReelsFromDB();
    const filteredReels = reels.filter((reel) => reel.file_name && reel.reel_url);

    return new Response(JSON.stringify({ videos: filteredReels }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in loader:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  const shopURL = formData.get("shopURL");

  if (!shopURL) {
    return new Response(
      JSON.stringify({ success: false, error: "Shop URL is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const { admin } = await authenticate.admin(request);

    if (actionType === "delete") {
      const reelIdsRaw = formData.get("reelIds");
      const reelIds = JSON.parse(reelIdsRaw);

      if (!Array.isArray(reelIds) || reelIds.length === 0) {
        throw new Error("Invalid or empty reel IDs provided");
      }

      // Split the combined IDs into separate arrays as ids for shopify and db are different 
      const idsArray = reelIds.map((combinedId) => combinedId.split("___")[0]); 
      const reelIdsArray = reelIds.map((combinedId) => combinedId.split("___")[1]);

      // Delete files from Shopify
      await deleteVideosFromShopify(reelIdsArray, admin);

      // Delete records from the database
      await deleteReel(idsArray);

      return new Response(
        JSON.stringify({
          success: true,
          actionType: "delete",
          message: "Reels deleted successfully",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    if (actionType === "upload") {
      const file = formData.get("file");

      if (!file) {
        throw new Error("No file provided");
      }

      const uploadResult = await uploadVideoToShopify(admin, file, shopURL);
     
      if (!uploadResult.success) {
        throw new Error(uploadResult.error);
      }
      
      return new Response(
        JSON.stringify({
          success: true,
          actionType: "upload",
          reel: uploadResult.reel,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: `Unsupported actionType: ${actionType}`,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error in action:", error.message);
    return new Response(
      JSON.stringify({
        success: false,
        actionType: actionType || "unknown",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
