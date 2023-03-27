import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  hash,
  verify
} from "argon2";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({
      email: z.string(),
      password: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {

      console.log({ input })

      const user = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      });

      console.log({ user })

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Enter the correct email and password combination.",
        });
      }

      const isValidPassword = await verify(user.password || 'qwerty', input.password);

      console.log({ isValidPassword })

      const userData = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: userData?.id,
      };
    }),

  signUp: publicProcedure
    .input(z.object({
      email: z.string(),
      password: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }

      const hashedPassword = await hash(password);
      console.log({ hashedPassword })

      const result = await ctx.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    },),

});