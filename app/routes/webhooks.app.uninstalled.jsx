import { authenticate } from "../utils/shopify.server";
import { handleAppUninstalled } from "../utils/shopify.server";

export const action = async ({ request }) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { shop } = await authenticate.webhook(request);
    await handleAppUninstalled(shop);
    return new Response("Webhook handled successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing APP_UNINSTALLED webhook:", error);
    return new Response("Webhook processing failed", { status: 500 });
  }
};