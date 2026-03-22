import { createSlikRoutes } from "@slik-pay/server/nextjs";
import { createUpstashStore } from "@slik-pay/server";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const store = createUpstashStore({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const { GET, POST } = createSlikRoutes({
  store,
  connection,
  rateLimit: false,
});
