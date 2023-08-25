import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
  const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);

  await prisma.admin.upsert({
    where: { email: 'admin@admin.com' },
    update: {
      password: passwordSabin
    },
    create: {
      email: 'admin@admin.com',
      name: 'Admin',
      password: passwordSabin,
      role: 'admin'
    }
  });

  await prisma.admin.upsert({
    where: { email: 'librarian@librarian.com' },
    update: {
      password: passwordAlex
    },
    create: {
      email: 'librarian@librarian.com',
      name: 'Librarian',
      password: passwordAlex,
      role: 'admin'
    }
  });

  const materials = [];
  for (let i = 1; i <= 10; i += 1) {
    materials.push({
      title: `Material ${i}`,
      author: `Author ${i}`,
      category: `Category ${i}`,
      isbn: `ISBN-${i}`,
      publicationYear: 2000 + i,
      pageCount: 100 + i,
      quantity: i,
      available: i > 0,
      type_material: 'BOOK'
    });
  }
}

main().catch((error: Error) => {
  throw new Error(error.message);
});
