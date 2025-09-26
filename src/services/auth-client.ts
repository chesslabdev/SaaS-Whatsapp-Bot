import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";
import {
    inferAdditionalFields,
    adminClient,
    organizationClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3001",
    plugins: [
        inferAdditionalFields<typeof auth>(),
        adminClient(),
        organizationClient(),
    ],
});
