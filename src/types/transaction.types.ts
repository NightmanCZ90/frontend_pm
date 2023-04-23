import { Currency } from '.';

export enum TransactionType {
  Buy = 'buy',
  Sell = 'sell',
  BuyToCover = 'buyToCover',
  SellShort = 'sellShort',
  DRIP = 'drip', // Dividends plus Reinvestments
  Dividends = 'dividends',
  Split = 'split',
}

export enum ExecutionType {
  FIFO = 'fifo', // First In First Out
  LIFO = 'lifo', // Last In First Out
  WeightedAverage = 'weightedAverage',
  SpecificLots = 'specificLots',
  HighCost = 'highCost',
  LowCost = 'lowCost',
}

export interface Transaction {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  stockName: string;
  stockSector: string | null;
  transactionTime: Date;
  transactionType: TransactionType;
  numShares: number; // in 100 - 0.01 is minimal num of shares
  price: number; // in 10 000 - 0.0001 is minimal price of share
  currency: Currency;
  execution: ExecutionType;
  commissions: number | null;
  notes: string | null;
  portfolioId: number;
}