import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { resetIngresses } from "@/actions/ingress";

export async function POST(req: Request) {
  try {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      console.error("Missing CLERK_WEBHOOK_SECRET");
      throw new Error(
        "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
      );
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error("Missing svix headers");
      return new Response("Error occured -- no svix headers", {
        status: 400,
      });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occured", {
        status: 400,
      });
    }

    // Do something with the payload
    const eventType = evt.type;
    console.log(`Processing webhook event: ${eventType}`);

    if (eventType === "user.created") {
      try {
        // Check if user already exists
        const existingUser = await db.user.findUnique({
          where: {
            externalUserId: payload.data.id,
          },
        });

        // Only create if user doesn't exist
        if (!existingUser) {
          console.log(`Creating new user with externalUserId: ${payload.data.id}`);
          await db.user.create({
            data: {
              externalUserId: payload.data.id,
              username: payload.data.username,
              imageUrl: payload.data.image_url,
              stream: {
                create: {
                  name: `${payload.data.username}'s Stream`,
                },
              },
            },
          });
          console.log(`User created successfully: ${payload.data.id}`);
        } else {
          console.log(`User with externalUserId ${payload.data.id} already exists. Skipping creation.`);
        }
      } catch (error) {
        console.error(`Error processing user.created event:`, error);
        return new Response(JSON.stringify({ error: "Error processing user creation" }), {
          status: 500,
        });
      }
    }

    if (eventType === "user.updated") {
      try {
        const currentUser = await db.user.findUnique({
          where: {
            externalUserId: payload.data.id,
          },
        });

        if (!currentUser) {
          console.log(`User not found for update: ${payload.data.id}`);
          return new Response("User Not Found", { status: 404 });
        }

        console.log(`Updating user: ${payload.data.id}`);
        await db.user.update({
          where: {
            externalUserId: payload.data.id,
          },
          data: {
            username: payload.data.username,
            imageUrl: payload.data.image_url,
          },
        });
        console.log(`User updated successfully: ${payload.data.id}`);
      } catch (error) {
        console.error(`Error processing user.updated event:`, error);
        return new Response(JSON.stringify({ error: "Error processing user update" }), {
          status: 500,
        });
      }
    }

    if (eventType === "user.deleted") {
      try {
        console.log(`Deleting user: ${payload.data.id}`);
        await resetIngresses(payload.data.id);

        await db.user.delete({
          where: {
            externalUserId: payload.data.id,
          },
        });
        console.log(`User deleted successfully: ${payload.data.id}`);
      } catch (error) {
        console.error(`Error processing user.deleted event:`, error);
        return new Response(JSON.stringify({ error: "Error processing user deletion" }), {
          status: 500,
        });
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Unexpected error in webhook handler:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
