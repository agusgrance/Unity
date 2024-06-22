"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { Stream } from "@prisma/client";
import { getSelf } from "@/lib/auth-service";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const selfStream = await db.stream.findUnique({
      where: {
        userId: self.id,
      },
    });

    if (!selfStream) throw new Error("Stream not found");

    const stream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...values,
      },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);
    revalidatePath(`/`);

    return stream;
  } catch (error) {
    throw new Error("Internal Error");
  }
};
