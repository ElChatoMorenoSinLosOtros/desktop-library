import AdminActions from '@admins/entities/AdminActions';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
  const passwordTechnician = await bcrypt.hash(
    'password-technician',
    roundsOfHashing
  );
  const passwordLibrarian = await bcrypt.hash(
    'password-librarian',
    roundsOfHashing
  );
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

  await prisma.admin.upsert({
    where: { email: 'librarian@librarian.com' },
    update: {
      password: passwordLibrarian
    },
    create: {
      email: 'librarian@librarian.com',
      name: 'Librarian',
      password: passwordLibrarian,
      role: 'librarian',
      actions: {
        menu: actions.menu.slice(0, 4)
      }
    }
  });

  await prisma.admin.upsert({
    where: { email: 'technician@technician.com' },
    update: {
      password: passwordLibrarian
    },
    create: {
      email: 'technician@technician.com',
      name: 'Technician',
      password: passwordTechnician,
      role: 'technician',
      actions: {
        menu: actions.menu.slice(3, 6)
      }
    }
  });
}

main().catch((error: Error) => {
  throw new Error(error.message);
});
