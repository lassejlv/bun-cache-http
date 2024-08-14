import { z } from "zod";

const env = z.object({
  PORT: z.string(),
  USERNAME: z.string(),
  PASSWORD: z.string(),
  PERSISTANCE: z.string(),
});

env.parse(Bun.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}
