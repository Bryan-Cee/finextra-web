import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { hash, verify } from "argon2";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      });

      console.log({ user });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Enter the correct email and password combination.",
        });
      }

      if (!user.password) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User does not have a password set.",
        });
      }

      const isValidPassword = await verify(user.password, input.password);

      console.log({ isValidPassword });

      const userData = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      });

      return {
        status: 201,
        message: "Login successful",
        result: {
          id: userData?.id,
          email: userData?.email,
          name: userData?.name,
        },
      };
    }),

  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
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

      const userData = await ctx.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: email.split("@")[0],
        },
      });

      console.log({ userData });

      return {
        status: 201,
        message: "Account created successfully",
        result: {
          id: userData?.id,
          email: userData?.email,
          name: userData?.name,
        },
      };
    }),
});
