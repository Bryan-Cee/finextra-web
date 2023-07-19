import { PrismaClient } from "@prisma/client";

import { fundAccounts, transactions, user } from "./data";

const prisma = new PrismaClient();

async function main() {
  const userSeed = await prisma.user.upsert({
    where: { email: "cheruiyotbryan@gmail.com" },
    update: {},
    create: { ...user },
  });

  console.log(userSeed.name, "user created...");

  const [transactionsDeleted, fundAccountDeleted, ...fundAccountsAdded] =
    await prisma.$transaction([
      prisma.transaction.deleteMany({
        where: { userId: user.id },
      }),
      prisma.fundAccount.deleteMany({
        where: { userId: user.id },
      }),
      ...fundAccounts.map((fundAccount) =>
        prisma.fundAccount.create({
          data: fundAccount,
        })
      ),
    ]);

  console.log(transactionsDeleted.count, "Transactions deleted...");
  console.log(fundAccountDeleted.count, "Fund Accounts deleted...");
  console.log(fundAccountsAdded.length, "Fund accounts created...");

  const transaction = await prisma.$transaction([
    ...transactions.map((transaction) => {
      if (transaction.type === "WITHDRAW") {
        transaction.amount = transaction.amount * -1;
      }
      transaction.created_at = transaction.expense_date;
      return prisma.transaction.create({
        data: transaction,
      });
    }),
  ]);

  console.log(transaction.length, "transactions created...");
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
