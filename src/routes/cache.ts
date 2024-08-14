import { Hono } from "hono/tiny";
import { cache } from "../index";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const cacheRoute = new Hono();

const schema = z.object({ value: z.any(), ttl: z.number() });

cacheRoute.get("/get/:key", (c) => {
  const key = c.req.param("key");

  const value = cache.get(key);
  if (!value) return c.json({ error: "key not found" }, 404);

  return c.json({ key, value });
});

cacheRoute.post("/set/:key", zValidator("json", schema), (c) => {
  try {
    const { value, ttl } = c.req.valid("json");

    if (!value) return c.json({ error: "value is required" }, 400);

    const key = c.req.param("key");
    cache.put(key, value, ttl);

    return c.json({ key, value, ttl });
  } catch (error: any) {
    return c.json({ error: error.message }, 400);
  }
});

cacheRoute.delete("/delete/:key", (c) => {
  const key = c.req.param("key");

  const value = cache.get(key);
  if (!value) return c.json({ error: "key not found" }, 404);

  cache.delete(key);

  return c.json({ key, value });
});
