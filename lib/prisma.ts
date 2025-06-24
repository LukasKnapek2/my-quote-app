import { PrismaClient } from '@prisma/client';

declare global {
  // Extend the NodeJS.Global interface to include `prisma`
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient;
    }
  }
}

// Declare a global variable for the Prisma client to prevent multiple instances in development
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
