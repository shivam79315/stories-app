// import "@shopify/shopify-app-remix/adapters/node";
// import {
//   ApiVersion,
//   AppDistribution,
//   shopifyApp,
// } from "@shopify/shopify-app-remix/server";
// import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
// import prisma from "./db.server";

// const shopify = shopifyApp({
//   apiKey: process.env.SHOPIFY_API_KEY,
//   apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
//   apiVersion: ApiVersion.October24,
//   scopes: process.env.SCOPES?.split(","),
//   appUrl: process.env.SHOPIFY_APP_URL || "",
//   authPathPrefix: "/auth",
//   sessionStorage: new PrismaSessionStorage(prisma),
//   distribution: AppDistribution.AppStore,
//   future: {
//     unstable_newEmbeddedAuthStrategy: true,
//     removeRest: true,
//   },
//   ...(process.env.SHOP_CUSTOM_DOMAIN
//     ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
//     : {}),
// });

// export default shopify;
// export const apiVersion = ApiVersion.October24;
// export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
// export const authenticate = shopify.authenticate;
// export const unauthenticated = shopify.unauthenticated;
// export const login = shopify.login;
// export const registerWebhooks = shopify.registerWebhooks;
// export const sessionStorage = shopify.sessionStorage;

import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import prisma from "./db.server";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.October24,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/app/uninstalled",
      callback: async ({ topic, shop }) => {
        console.log(`Handling ${topic} webhook for shop: ${shop}`);
        try {
          await prisma.session.update({
            where: { shop },
            data: {
              state: "uninstalled",
              accessToken: null,
            },
          });

          console.log(`Shop ${shop} marked as uninstalled.`);

          // Clear the shopURL cookie
          const clearCookieHeader =
            "shopURL=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0";
          return new Response(null, {
            headers: { "Set-Cookie": clearCookieHeader },
          });
        } catch (error) {
          console.error(
            `Error handling ${topic} webhook for shop: ${shop}`,
            error
          );
        }
      },
    },
    APP_SCOPES_UPDATE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/app/scopes_update",
      callback: async ({ topic, shop, payload }) => {
        console.log(`Handling ${topic} webhook for shop: ${shop}`);
        const { current: currentScopes } = payload;
        try {
          await prisma.session.update({
            where: { shop },
            data: {
              scope: currentScopes.join(","),
            },
          });
          console.log(`Scopes updated for shop ${shop}: ${currentScopes}`);
        } catch (error) {
          console.error(
            `Error handling ${topic} webhook for shop: ${shop}`,
            error
          );
        }
      },
    },
  },
  hooks: {
    afterAuth: async ({ session }) => {
      try {
        // Save session details in the database
        await prisma.session.upsert({
          where: { shop: session.shop },
          update: {
            accessToken: session.accessToken,
            scope: session.scope,
            state: session.state,
          },
          create: {
            shop: session.shop,
            accessToken: session.accessToken,
            scope: session.scope,
            state: session.state,
          },
        });
  
        // Register webhooks for the shop
        await shopify.registerWebhooks({ session });
  
        console.log(`Session created and webhooks registered for shop: ${session.shop}`);
  
        // Set the cookie with shopURL
        const cookieHeader = `shopURL=${encodeURIComponent(session.shop)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`;
        return new Response(null, {
          headers: { "Set-Cookie": cookieHeader },
        });
      } catch (error) {
        console.error("Error in afterAuth:", error);
        throw new Error("Error during app installation.");
      }
    },
  },
  future: {
    unstable_newEmbeddedAuthStrategy: true,
    removeRest: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = ApiVersion.October24;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;