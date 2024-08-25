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
      password: await bcrypt.hash('password', 12),
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
