import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { clientRouter } from "./routers/client";
import { contactRouter } from "./routers/contact";
import { documentRouter } from "./routers/document";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  client: clientRouter,
  contact: contactRouter,
  document: documentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
