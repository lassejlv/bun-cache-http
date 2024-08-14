import { Hono } from "hono/tiny";
import { basicAuth } from "hono/basic-auth";
import BunCache from "@samocodes/bun-cache";
import "./env";
import { cacheRoute } from "./routes/cache";

const app = new Hono();

// set basic auth
const USERNAME = Bun.env.USERNAME;
const PASSWORD = Bun.env.PASSWORD;

app.use(
  "*",
  basicAuth({
    username: USERNAME,
    password: PASSWORD,
  })
);

// initalize cache
const isPersistance = Bun.env.PERSISTANCE === "true";
export const cache = new BunCache(isPersistance);

app.route("/cache", cacheRoute);

app.get("/", (c) => {
  return c.text(`hello. time: ${new Date().toISOString()}`);
});

const PORT = Bun.env.PORT || 3000;

const server = Bun.serve({
  port: PORT,
  fetch: app.fetch,
});

console.log(`Server running on ${server.url}`);
console.log(`Press Ctrl+C to stop`);

const isLocal = server.url.toString().includes("localhost");
console.log(
  `Connection url: ${isLocal ? "http" : "https"}://${USERNAME}:${PASSWORD}@${server.url.toString().split("://")[1].replace("/", "")}`
);
