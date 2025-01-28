import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Export the instance so it can be used in your service files
export { prisma };
