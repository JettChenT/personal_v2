import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrate: {
    async development() {
      return {
        url: env("DATABASE_URL"),
      };
    },
  },
});
