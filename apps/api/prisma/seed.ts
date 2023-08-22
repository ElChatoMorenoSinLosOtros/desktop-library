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
}

main().catch((error: Error) => {
  throw new Error(error.message);
});
