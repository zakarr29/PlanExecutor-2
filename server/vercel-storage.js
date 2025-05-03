import { users } from "../shared/schema.js";
import session from "express-session";
import { db } from "./vercel-db.js";
import { eq } from "drizzle-orm";

// For Vercel deployment, we'll use a simple in-memory session store
// since serverless functions are stateless and don't share memory
const MemoryStore = require('memorystore')(session);

export class VercelStorage {
  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
  }

  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser) {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
}

export const storage = new VercelStorage();