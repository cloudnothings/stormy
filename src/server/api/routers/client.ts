import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const clientRouter = createTRPCRouter({
  createClient: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.client
        .create({
          data: {
            name: input.name,
            slug: input.slug,
          },
        })
        .catch((err) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: err.message,
          });
        });
    }),
  getClients: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.client.findMany().catch((err) => {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      });
    });
  }),
  getSlug: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.client
        .findUnique({
          where: {
            slug: input.slug,
          },
        })
        .then((client) => {
          if (client) {
            return client;
          }
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Client not found",
          });
        })
        .catch((err) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: err.message,
          });
        });
    }),
});
