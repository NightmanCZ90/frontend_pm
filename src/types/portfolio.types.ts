import { Transaction, User } from ".";

export enum PortfolioOwnership {
  Managed = 'managed',
  Managing = 'managing',
  Personal = 'personal',
  Unconfirmed = 'unconfirmed',
}

export interface PortfolioTypes {
  managed: Portfolio[];
  managing: Portfolio[];
  personal: Portfolio[];
}

export interface PortfolioPageTypes extends PortfolioTypes {
  unconfirmed: Portfolio[];
}

export interface Portfolio {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  name: string;
  description: string | null;
  color: string | null;
  url: string | null;
  userId: number;
  pmId: number | null;
  confirmed: boolean;
  user?: User;
  portfolioManager?: User;
  transactions?: Transaction[];
}