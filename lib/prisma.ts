// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// This is crucial: Augment the global object's type
// to include a 'prisma' property.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

// We use this pattern to prevent multiple instances of PrismaClient
// in development (due to Next.js hot reloading).
// In production, a new instance is created on each deployment.
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // In development, store the PrismaClient instance on the global object
  // to reuse it across hot reloads.
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;