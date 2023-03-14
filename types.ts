export type TransactionType = 'withdrawal' | 'deposit' | 'interest';

export type Transaction = {
  accountId: string,
  date: Date,
  description: string,
  account: string,
  type: TransactionType,
  amount: number,
}
