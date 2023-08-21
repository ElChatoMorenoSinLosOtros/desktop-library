import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;


async function main() {
  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
  const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);

  await prisma.admins.upsert({
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

  await prisma.admins.upsert({
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

  // Seed Materials
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
      available: i > 0, // Set availability based on quantity
      type_material: 'BOOK'
    });
  }

  console.log('Seeding complete.');
  if (!users || !materials) {
    throw new Error('Upsert failed');
  }

  // Seed Users
  const seededUsers = await prisma.client.createMany({
    data: users
  });

  // Seed Materials
  const seededMaterials = await prisma.material.createMany({
    data: materials
  });

  console.log('Seeded users:', seededUsers);
  console.log('Seeded materials:', seededMaterials);
}

main().catch((error: Error) => {
  throw new Error(error.message);
});
