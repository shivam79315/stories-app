// import { PrismaClient } from "@prisma/client";

// if (process.env.NODE_ENV !== "production") {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
// }

// const prisma = global.prisma || new PrismaClient();

// export default prisma;

import { PrismaClient } from "@prisma/client";

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
