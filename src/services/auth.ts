import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { admin, organization } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";

const client = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(client, {
        provider: "postgresql",
    }),
    appName: "Bot Chess SaaS",
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        organization(),
        admin(),
        nextCookies(),
    ],
});
