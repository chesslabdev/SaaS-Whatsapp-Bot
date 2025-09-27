import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { admin, organization } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";
import { stripe } from "@better-auth/stripe"
import Stripe from "stripe"

const client = new PrismaClient();

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia",
})



export const auth = betterAuth({
    database: prismaAdapter(client, {
        provider: "postgresql",
    }),
    appName: "Bot Chess SaaS",
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        stripe({
            stripeClient,
            stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
            createCustomerOnSignUp: true,
            subscription: {
                enabled: true,
                defaultPlan: "Free",
                plans: [
                    {
                        id: "Pro",
                        name: "Pro",
                        price: 100,
                        interval: "month",
                        stripePriceId: "price_1SBzdtDKaNg8RHLLCVV6Vfy8",
                    },
                    {
                        id: "Free",
                        name: "Free",
                        price: 0,
                        interval: "month",
                        stripePriceId: "price_1SBzeiDKaNg8RHLLB9FRwnBB",
                    }
                ],
            }
        }),
        organization({
            teams: {
                enabled: true,
                maximumTeams: 10, // Optional: limit teams per organization
                allowRemovingAllTeams: false, // Optional: prevent removing the last team
            },
        }),
        admin(),
        nextCookies(),
    ],
});
