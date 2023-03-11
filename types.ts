export type TransactionType = 'withdrawal' | 'deposit' | 'interest';

export type Transaction = {
  accountId: string,
  date: Date | number,
  description: string,
  account: string,
  type: TransactionType,
  amount: number,
}
