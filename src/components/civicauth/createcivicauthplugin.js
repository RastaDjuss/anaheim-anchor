import { createCivicAuthPlugin } from "@civic/auth/nextjs"
import { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
};

const withCivicAuth = createCivicAuthPlugin({
    clientId: "9f88d013-7a73-4005-9e4d-68130eb8aa2c"
});

export default withCivicAuth(nextConfig)