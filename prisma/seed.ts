import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient()

async function main() {

  const user = await prisma.user.upsert({
    where: { email: 'cheruiyotbryan@gmail.com' },
    update: {},
    create: {
      id: 'clespiymq0000utnqi9jhhf3x',
      email: 'cheruiyotbryan@gmail.com',
      emailVerified: new Date(),
      image: '',
      password: await hash('password'),
      name: 'Bryan Cheruiyot',
    }
  });
  console.log({ user })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
