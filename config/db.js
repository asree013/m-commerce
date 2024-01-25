const { PrismaClient } = require('../prisma/src/prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;