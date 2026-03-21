import { createSlikRoutes } from "@slik-pay/server/nextjs";
import { createMemoryStore } from "@slik-pay/server";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const store = createMemoryStore();
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const { GET, POST } = createSlikRoutes({
  store,
  connection,
  rateLimit: false,
});
