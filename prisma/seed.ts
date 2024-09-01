import { type Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      password: await bcrypt.hash('Aa123456789.', 12),
      name: 'Admin',
      role: 'ADMIN',
      image: faker.image.avatar(),
    },
  });

  // Create Users
  const numsOfUsers = 10;
  const userIds: number[] = [admin.id];
  const adminIds: number[] = [admin.id];

  for (let i = 0; i < numsOfUsers; i++) {
    const createUserInput: Prisma.UserCreateInput = {
      name: faker.internet.displayName(),
      email: faker.internet.email(),
      password: await bcrypt.hash(faker.internet.password(), 12),
      role: faker.helpers.arrayElement(['ADMIN', 'MANAGER']),
      image: faker.image.avatarLegacy(),
    };

    const user = await prisma.user.upsert({
      where: { email: createUserInput.email },
      update: {},
      create: createUserInput,
    });

    userIds.push(user.id);
    if (user.role !== 'MANAGER') adminIds.push(user.id);
  }

  // Create Categories
  const numsOfCategories = 10;
  const categoryIds: number[] = [admin.id];
  for (let i = 0; i < numsOfCategories; i++) {
    const name = faker.word.noun();
    const userId = faker.helpers.arrayElement(userIds);
    const createCategoryInput: Prisma.CategoryCreateInput = {
      name,
      user: { connect: { id: userId } },
    };

    const category = await prisma.category.upsert({
      where: {
        name: createCategoryInput.name,
      },
      update: {},
      create: createCategoryInput,
    });

    categoryIds.push(category.id);
  }

  const numsOfStocks = 100;
  for (let i = 0; i < numsOfStocks; i++) {
    const name = faker.word.noun();
    const userId = faker.helpers.arrayElement(userIds);
    const categoryId = faker.helpers.arrayElement(categoryIds);
    const createStockInput: Prisma.StockCreateInput = {
      name,
      amount: faker.number.int({ min: 1, max: 60 }),
      image: faker.image.url(),
      detail: faker.lorem.paragraphs({ min: 3, max: 10 }),
      status: faker.helpers.arrayElement(['APPROVED', 'REJECTED']),
      category: { connect: { id: categoryId } },
      user: { connect: { id: userId } },
    };

    await prisma.stock.upsert({
      where: {
        name: createStockInput.name,
      },
      update: {},
      create: createStockInput,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
