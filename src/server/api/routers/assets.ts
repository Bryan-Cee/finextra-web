import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { AssetType } from "@prisma/client";

export const assetsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.asset.findMany({});
  }),

  createAsset: protectedProcedure
    .input(z.object({
      title: z.string(),
      description: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
      type: z.enum([AssetType.CASH, AssetType.LAND, AssetType.SHARE]),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.asset
        .create({
          data: {
            title: input.title,
            description: input.description,
            type: input.type,
            userId: ctx.session.user.id,
            unitPrice: input.unitPrice,
            quantity: input.quantity,
          },
        });
    }),
});
