export enum Role {
  Administrator = 'administrator',
  PortfolioManager = 'portfolioManager',
  Investor = 'investor',
}

export interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  currency: string;
  role: Role;
  isActive: boolean;
}