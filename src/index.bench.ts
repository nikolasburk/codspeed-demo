import { PrismaClient } from "@prisma/client";
import { bench, describe } from "vitest";

const prisma = new PrismaClient();

describe("prisma-orm", () => {
  const date = new Date();

  /**
   * findMany
   */

  bench("finMany-base", async () => {
    const customers = await prisma.customer.findMany();
  });

  bench("findMany-filters-ordering-pagination", async () => {
    // Find many customers with filtering, ordering, and pagination
    const customersWithOptions = await prisma.customer.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: 0,
      take: 10,
    });
  });

  bench("findMany-1-level-nesting", async () => {
    // Find many customers with their orders
    const customersWithOrders = await prisma.customer.findMany({
      include: {
        orders: true,
      },
    });
  });

  bench("findMany-2-level-nesting", async () => {
    // Find many customers with their orders and products
    const customersWithOrdersAndProducts = await prisma.customer.findMany({
      include: {
        orders: {
          include: {
            products: true,
          },
        },
      },
    });
  });

  bench("findMany-relation-filters", async () => {
    const customersWithLargeOrders = await prisma.customer.findMany({
      include: {
        orders: {
          where: {
            totalAmount: {
              gt: 100,
            },
          },
        },
      },
    });
  });

  /**
   * findFirst
   */

  bench("findFirst-base", async () => {
    // Find first customer
    const firstCustomer = await prisma.customer.findFirst();
  });

  bench("findFirst-1-level-nesting", async () => {
    // Find first customer with their orders
    const firstCustomerWithOrders = await prisma.customer.findFirst({
      include: {
        orders: true,
      },
    });
  });

  bench("findFirst-2-level-nesting", async () => {
    // Find first customer with their orders and products
    const firstCustomerWithOrdersAndProducts = await prisma.customer.findFirst({
      include: {
        orders: {
          include: {
            products: true,
          },
        },
      },
    });
  });

  bench("findFirst-relation-filters", async () => {
    const customerWithLargeOrders = await prisma.customer.findFirst({
      include: {
        orders: {
          where: {
            totalAmount: {
              gt: 100,
            },
          },
        },
      },
    });
  });

  /**
   * findFirstOrThrow
   */

  bench("findFirstOrThrow-base", async () => {
    // Find first customer
    const firstCustomer = await prisma.customer.findFirstOrThrow();
  });

  bench("findFirstOrThrow-1-level-nesting", async () => {
    // Find first customer with their orders
    const firstCustomerWithOrders = await prisma.customer.findFirstOrThrow({
      include: {
        orders: true,
      },
    });
  });

  bench("findFirstOrThrow-2-level-nesting", async () => {
    // Find first customer with their orders and products
    const firstCustomerWithOrdersAndProducts = await prisma.customer.findFirstOrThrow({
      include: {
        orders: {
          include: {
            products: true,
          },
        },
      },
    });
  });

  bench("findFirstOrThrow-relation-filters", async () => {
    const customerWithLargeOrders = await prisma.customer.findFirstOrThrow({
      include: {
        orders: {
          where: {
            totalAmount: {
              gt: 100,
            },
          },
        },
      },
    });
  });

  /**
   * findUnique
   */

  bench("findUnique-base", async () => {
    // Find first customer
    const firstCustomer = await prisma.customer.findUnique({
      where: { id: 1 },
    });
  });

  bench("findUnique-1-level-nesting", async () => {
    // Find first customer with their orders
    const firstCustomerWithOrders = await prisma.customer.findUnique({
      where: { id: 1 },
      include: {
        orders: true,
      },
    });
  });

  bench("findUnique-2-level-nesting", async () => {
    // Find first customer with their orders and products
    const firstCustomerWithOrdersAndProducts = await prisma.customer.findUnique({
      where: { id: 1 },
      include: {
        orders: {
          include: {
            products: true,
          },
        },
      },
    });
  });

  bench("findUnique-relation-filters", async () => {
    const customerWithLargeOrders = await prisma.customer.findUnique({
      where: { id: 1 },
      include: {
        orders: {
          where: {
            totalAmount: {
              gt: 100,
            },
          },
        },
      },
    });
  });

  /**
   * findUniqueOrThrow
   */

  bench("findUniqueOrThrow-base", async () => {
    // Find first customer
    const firstCustomer = await prisma.customer.findUniqueOrThrow({
      where: { id: 1 },
    });
  });

  bench("findUniqueOrThrow-1-level-nesting", async () => {
    // Find first customer with their orders
    const firstCustomerWithOrders = await prisma.customer.findUniqueOrThrow({
      where: { id: 1 },
      include: {
        orders: true,
      },
    });
  });

  bench("findUniqueOrThrow-2-level-nesting", async () => {
    // Find first customer with their orders and products
    const firstCustomerWithOrdersAndProducts = await prisma.customer.findUniqueOrThrow({
      where: { id: 1 },
      include: {
        orders: {
          include: {
            products: true,
          },
        },
      },
    });
  });

  bench("findUniqueOrThrow-relation-filters", async () => {
    const customerWithLargeOrders = await prisma.customer.findUniqueOrThrow({
      where: { id: 1 },
      include: {
        orders: {
          where: {
            totalAmount: {
              gt: 100,
            },
          },
        },
      },
    });
  });
});
