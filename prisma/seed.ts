import { PrismaClient } from '@prisma/client';

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
      name: 'Bryan Cheruiyot',
    }
  });

  const fundAccount = await prisma.fundAccount.upsert({
    where: { id: "clespiymq0000utnqi9terf3x" },
    update: {},
    create: {
      id: "clespiymq0000utnqi9terf3x",
      title: 'Savings',
      userId: user.id,
    },
  });

  console.log({ fundAccount, user })
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
