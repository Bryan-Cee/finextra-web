import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { AssetType } from "@prisma/client";

export const assetsHistoryRouter = createTRPCRouter({
  getAssetHistory: protectedProcedure
    .input(
      z.object({
        assetId: z.string(),
      })
    )
    .query(({ ctx }) => {
      return ctx.prisma.assetHistory.findMany({});
    }),

  createAssetHistory: protectedProcedure
    .input(
      z.object({
        assetId: z.string(),
        title: z.string(),
        description: z.string(),
        quantity: z.number(),
        unitPrice: z.number(),
        type: z.enum([AssetType.CASH, AssetType.LAND, AssetType.SHARE]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.assetHistory.create({
        data: {
          assetId: input.assetId,
          title: input.title.trim(),
          description: input.description.trim(),
          type: input.type,
          userId: ctx.userId,
          unitPrice: input.unitPrice,
          quantity: input.quantity,
        },
      });
    }),
});
