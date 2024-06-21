

import { PrismaClient } from '@prisma/client'
import { bench, describe } from "vitest";

const prisma = new PrismaClient()

function fibonacci(n: number): number {
  if (n < 2) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

describe("fibo", () => {
  bench("user-create", async () => {
    const date = new Date()
    await prisma.user.create({
      data: {
        email: date + '@prisma.io'
      }
    })
  });
  bench("user-findMany", async () => {
    await prisma.user.findMany()
  });
});

// // A `main` function so that we can use async/await
// async function main() {

// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
