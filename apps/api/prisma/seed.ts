import AdminActions from '@admins/entities/AdminActions';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
  const actions: AdminActions = {
    menu: [
      {
        id: 1,
        title: 'Notifications',
        url: '/notifications'
      },
      {
        id: 2,
        title: 'Persons Management',
        url: '/person-management'
      },
      {
        id: 3,
        title: 'Materials Management',
        url: '/material-management'
      },
      {
        id: 4,
        title: 'Loans Management',
        url: '/loan-management'
      },
      {
        id: 5,
        title: 'Fines Management',
        url: '/fines-management'
      },
      {
        id: 6,
        title: 'Reservations Management',
        url: '/reservations-management'
      }
    ]
  };
  await prisma.admin.upsert({
    where: { email: 'admin@admin.com' },
    update: {
      password: passwordSabin
    },
    create: {
      email: 'admin@admin.com',
      name: 'Admin',
      password: passwordSabin,
      role: 'admin',
      actions
    }
  });
}

main().catch((error: Error) => {
  throw new Error(error.message);
});
