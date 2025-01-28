import { authenticate as shopifyAuth } from "./shopify.server";
import { uploadVideoToShopify } from "../services/videoUpload";

export const loader = async ({ request }) => {
  await shopifyAuth.admin(request);
  return null;
};

export const action = async ({ request }) => {
  const { admin } = await shopifyAuth.admin(request);
  const formData = await request.formData();
  const file = formData.get("file");
  const appBridgeConfig = sessionStorage.getItem('app-bridge-config');

  if (file) {
    const uploadResult = await uploadVideoToShopify(admin, file);
    if (!uploadResult.success) {
      return { success: false, error: uploadResult.error };
    }
    if(uploadResult.success) {
        const config = JSON.parse(appBridgeConfig);
        const shopURL = config.shop;
        console.log("shop URL is ",shopURL)
      return { success: true, fileInfo: uploadResult.fileInfo };
    }
  }

  return { success: false, error: "No file provided" };
};