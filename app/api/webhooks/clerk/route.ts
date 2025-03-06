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

    const eventType = evt.type;
    console.log(`Processing webhook event: ${eventType}`);

    if (eventType === "user.created") {
      try {
        try {
          await db.$queryRaw`SELECT 1`;
          console.log("Database connection is working for user.created");
        } catch (dbError) {
          console.error("Database connection error in user.created:", dbError);
          return new Response(JSON.stringify({
            error: "Database connection error",
            details: dbError instanceof Error ? dbError.message : String(dbError)
          }), {
            status: 500,
            headers: {
              "Content-Type": "application/json"
            }
          });
        }

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
        return new Response(JSON.stringify({
          error: "Error processing user creation",
          details: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        }), {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
    }

    if (eventType === "user.updated") {
      try {
        try {
          await db.$queryRaw`SELECT 1`;
          console.log("Database connection is working for user.updated");
        } catch (dbError) {
          console.error("Database connection error in user.updated:", dbError);
          return new Response(JSON.stringify({
            error: "Database connection error",
            details: dbError instanceof Error ? dbError.message : String(dbError)
          }), {
            status: 500,
            headers: {
              "Content-Type": "application/json"
            }
          });
        }

        const currentUser = await db.user.findUnique({
          where: {
            externalUserId: payload.data.id,
          },
        });

        if (!currentUser) {
          console.log(`User not found for update: ${payload.data.id}`);
          return new Response(JSON.stringify({ message: "User Not Found" }), {
            status: 404,
            headers: {
              "Content-Type": "application/json"
            }
          });
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
        return new Response(JSON.stringify({
          error: "Error processing user update",
          details: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        }), {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
    }

    if (eventType === "user.deleted") {
      try {
        console.log(`Deleting user: ${payload.data.id}`);

        // Verificar la conexión a la base de datos antes de realizar operaciones
        try {
          // Ejecutar una consulta simple para verificar la conexión
          await db.$queryRaw`SELECT 1`;
          console.log("Database connection is working");
        } catch (dbError) {
          console.error("Database connection error:", dbError);
          return new Response(JSON.stringify({
            error: "Database connection error",
            details: dbError instanceof Error ? dbError.message : String(dbError)
          }), {
            status: 500,
            headers: {
              "Content-Type": "application/json"
            }
          });
        }

        const userToDelete = await db.user.findUnique({
          where: {
            externalUserId: payload.data.id,
          },
        });

        if (!userToDelete) {
          console.log(`User with externalUserId ${payload.data.id} not found for deletion. Skipping.`);
          return new Response(JSON.stringify({ message: "User not found, nothing to delete" }), {
            status: 200,
            headers: {
              "Content-Type": "application/json"
            }
          });
        }

        try {
          await resetIngresses(payload.data.id);
          console.log(`Ingresses reset successfully for user: ${payload.data.id}`);
        } catch (ingressError) {
          console.error(`Error resetting ingresses:`, ingressError);
        }

        // Eliminar el usuario
        await db.user.delete({
          where: {
            externalUserId: payload.data.id,
          },
        });
        console.log(`User deleted successfully: ${payload.data.id}`);
      } catch (error) {
        console.error(`Error processing user.deleted event:`, error);
        // Incluir más detalles sobre el error
        return new Response(JSON.stringify({
          error: "Error processing user deletion",
          details: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined
        }), {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
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
