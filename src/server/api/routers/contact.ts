import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const contactRouter = createTRPCRouter({
  createContact: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        clientId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.contact
        .create({
          data: {
            name: input.name,
            email: input.email,
            client: {
              connect: {
                id: input.clientId,
              },
            },
          },
        })
        .catch((err: Error) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: err.message,
          });
        });
    }),
});
