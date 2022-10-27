import { PrismaClient } from "../prisma";

export interface Context {
  prisma: PrismaClient;
  uid: string | null;
}

export interface AuthorizedContext extends Context {
  uid: string;
}