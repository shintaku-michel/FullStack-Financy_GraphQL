import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/client";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL! });

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prismaClient = globalForPrisma.prisma || new PrismaClient({ adapter })

globalForPrisma.prisma = prismaClient;
