import postgres from "postgres";

const globalForDatabase = globalThis;

export function hasDatabaseConfig() {
  return Boolean(process.env.DATABASE_URL);
}

export function getDatabase() {
  if (!hasDatabaseConfig()) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!globalForDatabase.__noskaDatabase) {
    globalForDatabase.__noskaDatabase = postgres(process.env.DATABASE_URL, {
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false,
      ssl: "require",
    });
  }

  return globalForDatabase.__noskaDatabase;
}
