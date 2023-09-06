import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);

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
}

main().catch((error: Error) => {
  throw new Error(error.message);
});
