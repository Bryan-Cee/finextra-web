export type TransactionType = 'withdrawal' | 'deposit' | 'interest';

export type Transaction = {
  date: Date | number,
  description: string,
  account: string,
  type: TransactionType,
  amount: number,
}
