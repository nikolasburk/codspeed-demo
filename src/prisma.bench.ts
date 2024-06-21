import { PrismaClient, Prisma } from "@prisma/client";
import { bench, describe } from "vitest";

const prisma = new PrismaClient();

describe("prisma-orm", () => {
  /**
   * findMany
   */

  bench("findMany-base", async () => {
    const customers = await prisma.customer.findMany();
    console.log(`customers:`, customers.length);
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
    console.log(`customersWithOptions:`, customersWithOptions.length);
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

  /**
   * create
   */

  bench("create-base", async () => {
    // Create a customer
    const newCustomer = await prisma.customer.create({
      data: {
        name: "John Doe",
        email: new Date() + "@example.com",
      },
    });
  });

  bench("create-1-level-of-nesting", async () => {
    // Create a customer
    const newCustomer = await prisma.customer.create({
      data: {
        name: "John Doe",
        email: new Date() + "@example.com",
      },
    });
  });

  bench("create-2-levels-of-nesting", async () => {
    // Create a customer with an address and an order with products
    const newCustomerWithOrder = await prisma.customer.create({
      data: {
        name: "John Doe",
        email: "john.doe@example.com",
        orders: {
          create: {
            date: new Date(),
            totalAmount: 100.5,
            products: {
              connect: [{ id: 1 }, { id: 2 }], // Assuming products with IDs 1 and 2 already exist
            },
          },
        },
      },
    });
  });

  /**
   * update
   */

  bench("update-base", async () => {
    // Update a customer
    const updatedCustomer = await prisma.customer.update({
      where: { id: 1 },
      data: {
        name: "John Doe Updated",
      },
    });
  });

  bench("update-1-level-of-nesting", async () => {
    // Update a customer and their address
    const updatedCustomerWithAddress = await prisma.customer.update({
      where: { id: 1 },
      data: {
        name: "John Doe Updated",
        address: {
          update: {
            street: "456 New St",
          },
        },
      },
    });
  });

  bench("update-2-levels-of-nesting", async () => {
    // Update a customer, their address, and an order's totalAmount
    const updatedCustomerWithOrder = await prisma.customer.update({
      where: { id: 1 },
      data: {
        name: "John Doe Updated",
        address: {
          update: {
            street: "456 New St",
          },
        },
        orders: {
          update: {
            where: { id: 1 },
            data: {
              totalAmount: 200.0,
            },
          },
        },
      },
    });
  });

  /**
   * upsert
   */

  bench("upsert-base", async () => {
    // Upsert a customer
    const upsertedCustomer = await prisma.customer.upsert({
      where: { id: 1 },
      update: {
        name: "John Doe Upserted",
      },
      create: {
        name: "John Doe",
        email: "john.doe@example.com",
      },
    });
  });

  bench("upsert-1-level-of-nesting", async () => {
    // Upsert a customer and their address
    const upsertedCustomerWithAddress = await prisma.customer.upsert({
      where: { id: 1 },
      update: {
        name: "John Doe Upserted",
        address: {
          update: {
            street: "456 New St",
          },
        },
      },
      create: {
        name: "John Doe",
        email: "john.doe@example.com",
        address: {
          create: {
            street: "123 Main St",
            city: "Anytown",
            postalCode: "12345",
            country: "Country",
          },
        },
      },
    });
  });

  bench("upsert-2-levels-of-nesting", async () => {
    // Upsert a customer, their address, and an order
    const upsertedCustomerWithOrder = await prisma.customer.upsert({
      where: { id: 1 },
      update: {
        name: "John Doe Upserted",
        orders: {
          upsert: {
            where: { id: 1 },
            update: {
              totalAmount: 200.0,
            },
            create: {
              date: new Date(),
              totalAmount: 100.5,
              products: {
                connect: [{ id: 1 }, { id: 2 }],
              },
            },
          },
        },
      },
      create: {
        name: "John Doe",
        email: "john.doe@example.com",
        orders: {
          create: {
            date: new Date(),
            totalAmount: 100.5,
            products: {
              connect: [{ id: 1 }, { id: 2 }],
            },
          },
        },
      },
    });
  });

  /**
   * delete
   */

  // bench("delete-base", async () => {
  //   // Delete a customer
  //   const deletedCustomer = await prisma.customer.delete({
  //     where: { id: 1 },
  //   });
  // });

  /**
   * createMany
   */

  bench("createMany-base", async () => {
    // Create many customers
    const users: Prisma.CustomerCreateInput[] = [];
    for (let i = 0; i < 1000; i++) {
      users.push({
        name: `Customer ${i}`,
        email: `customer${i}@example.com`,
      });
    }
    const createdCustomersCount = await prisma.customer.createMany({
      data: users,
    });
  });

  /**
   * createManyAndReturn
   */

  bench("createManyAndReturn-base", async () => {
    // Create many customers
    const users: Prisma.CustomerCreateInput[] = [];
    for (let i = 0; i < 1000; i++) {
      users.push({
        name: `Customer ${i}`,
        email: `customer${i}@example.com`,
      });
    }
    const createdCustomersCount = await prisma.customer.createManyAndReturn({
      data: users,
    });
  });

  /**
   * updateMany
   */

  bench("updateMany-base", async () => {
    // Update many customers to be active
    const updatedCustomers = await prisma.customer.updateMany({
      where: { isActive: false },
      data: { isActive: true },
    });
  });

  /**
   * deleteMany
   */

  bench("deleteMany-base", async () => {
    // Delete many customers who are inactive
    const deletedCustomers = await prisma.customer.deleteMany({
      where: { isActive: false },
    });
  });

  /**
   * aggregate
   */

  bench("aggregate-base", async () => {
    const totalSales = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
    });
  });

  /**
   * groupBy
   */

  bench("groupBy-base", async () => {
    const salesByCustomer = await prisma.order.groupBy({
      by: ["customerId"],
      _sum: {
        totalAmount: true,
      },
      _count: {
        _all: true,
      },
    });
  });
});
