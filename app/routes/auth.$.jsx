import { authenticate } from "../utils/shopify.server";
import db from "../utils/db.server";
import { registerWebhooks } from "../utils/shopify";

// export const loader = async ({ request }) => {
//   try {
//     // Authenticate the request
//     const session = await authenticate.admin(request);

//     // Save or update the session in the database
//     await db.session.upsert({
//       where: { shop: session.shop },
//       update: {
//         accessToken: session.accessToken,
//         scope: session.scope,
//         isOnline: session.isOnline,
//         state: session.state,
//       },
//       create: {
//         id: session.id,
//         shop: session.shop,
//         accessToken: session.accessToken,
//         scope: session.scope,
//         isOnline: session.isOnline,
//         state: session.state,
//       },
//     });

//     console.log(`Session created/updated for shop: ${session.shop}`);

//     // Register required webhooks
//     await registerWebhooks(session.shop, session.accessToken);
//     console.log(`Webhooks registered for shop: ${session.shop}`);

//     return new Response(
//       JSON.stringify({ success: true, message: "Session and webhooks updated." }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("Error during authentication or session handling:", error);

//     return new Response(
//       JSON.stringify({ success: false, error: error.message }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// };


// export const loader = async ({ request }) => {
//   try {
//     const session = await authenticate.admin(request);

//     const existingShop = await db.session.findUnique({
//       where: { shop: session.shop },
//     });

//     if (existingShop) {
//       // Update the shop's accessToken and state if reinstalled
//       await db.session.update({
//         where: { shop: session.shop },
//         data: {
//           accessToken: session.accessToken,
//           state: "installed",
//         },
//       });
//       console.log(`Session updated for reinstalled shop: ${session.shop}`);
//     } else {
//       // Create a new session for a fresh installation
//       await db.session.create({
//         data: {
//           id: session.id,
//           shop: session.shop,
//           accessToken: session.accessToken,
//           scope: session.scope,
//           isOnline: session.isOnline,
//           state: "installed",
//         },
//       });
//       console.log(`Session created for new shop: ${session.shop}`);
//     }

//     await registerWebhooks(session.shop, session.accessToken);
//     return new Response(
//       JSON.stringify({ success: true, message: "Session and webhooks updated." }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("Error during authentication or session handling:", error);
//     return new Response(
//       JSON.stringify({ success: false, error: error.message }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// };

export const loader = async ({ request }) => {
  try {
    const session = await authenticate.admin(request);

    const existingShop = await db.session.findUnique({
      where: { shop: session.shop },
    });

    if (existingShop) {
      // Update the shop's accessToken, state, and scope if reinstalled
      await db.session.update({
        where: { shop: session.shop },
        data: {
          accessToken: session.accessToken,
          state: "installed",
          scope: session.scope.join(','), // Convert scopes array to a comma-separated string
        },
      });
      console.log(`Session updated for reinstalled shop: ${session.shop}`);
    } else {
      // Create a new session for a fresh installation
      await db.session.create({
        data: {
          id: session.id,
          shop: session.shop,
          accessToken: session.accessToken,
          scope: session.scope.join(','), // Convert scopes array to a comma-separated string
          isOnline: session.isOnline,
          state: "installed",
        },
      });
      console.log(`Session created for new shop: ${session.shop}`);
    }

    // Register required webhooks
    await registerWebhooks(session.shop, session.accessToken);

    return new Response(
      JSON.stringify({ success: true, message: "Session and webhooks updated." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error during authentication or session handling:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
