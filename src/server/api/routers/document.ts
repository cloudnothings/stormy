import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const documentRouter = createTRPCRouter({
  updateDocument: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        notes: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.document
        .update({
          where: {
            id: input.id,
          },
          data: {
            title: input.title,
            notes: input.notes,
          },
        })
        .catch((err) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: err.message,
          });
        });
    }),
  getDocument: protectedProcedure

    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.document
        .findUnique({
          where: {
            id: input.id,
          },
        })
        .then((document) => {
          if (!document) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Document not found",
            });
          }
          return document;
        })
        .catch((err) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: err.message,
          });
        });
    }),

  createDocument: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        notes: z.string(),
        clientId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.document
        .create({
          data: {
            title: input.title,
            notes: input.notes,
            client: {
              connect: {
                id: input.clientId,
              },
            },
          },
        })
        .catch((err) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: err.message,
          });
        });
    }),
  getRecentlyCreatedDocuments: protectedProcedure
    .input(
      z.object({
        clientId: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (input.clientId) {
        return await ctx.prisma.document.findMany({
          where: {
            clientId: input.clientId,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        });
      }
    }),
  getRecentlyUpdatedDocuments: protectedProcedure
    .input(
      z.object({
        clientId: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (input.clientId) {
        return await ctx.prisma.document.findMany({
          where: {
            clientId: input.clientId,
          },
          orderBy: {
            updatedAt: "desc",
          },
          take: 5,
        });
      }
    }),
});
