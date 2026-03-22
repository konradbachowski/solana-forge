import { createSlikRoutes } from "@slik-pay/server/nextjs";
import { createUpstashStore, createMemoryStore } from "@slik-pay/server";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const hasRedis =
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN;

const store = hasRedis
  ? createUpstashStore({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : createMemoryStore();

if (!hasRedis) {
  console.warn("No Redis configured - using in-memory store (dev only)");
}

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const { GET, POST } = createSlikRoutes({
  store,
  connection,
  rateLimit: false,
}
); // , hasRedis
