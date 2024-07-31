const { PrismaClient } = require('@prisma/client');

const globalForPrisma = globalThis || {};

globalForPrisma.prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = globalForPrisma.prisma;
}

module.exports = { prisma: globalForPrisma.prisma };
