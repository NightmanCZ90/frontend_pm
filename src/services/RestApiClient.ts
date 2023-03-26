import { Portfolio, PortfolioTypes, Role, Tokens, User } from '../types';
import ApiClient from './ApiClient';
import { BASE_URL } from './axios';

export interface IdentifierQuery {
  id: string;
}

class RestApiClient extends ApiClient {
  baseUrl = BASE_URL;

  /**
   * Authentication
   */

  async signUp(body: {
    email: string,
    password: string,
    confirmPassword: string,
  }) {
    return this.axiosRequest<Tokens>({
      url: '/auth/signup',
      method: 'POST',
      body,
    })
  }

  async signIn(body: {
    email: string,
    password: string,
  }) {
    return this.axiosRequest<Tokens>({
      url: '/auth/signin',
      method: 'POST',
      body,
    })
  }

  /**
   * Current User
   */

  // async getUser(userId: number) {
  //   return this.axiosRequest<User>({
  //     url: `/users/${userId}`,
  //     method: 'GET'
  //   })
  // }

  async getCurrentUser() {
    return this.axiosRequest<User>({
      url: '/users/current',
      method: 'GET'
    })
  }

  async updateUser(userId: number, body: {
    firstName: string,
    lastName: string,
    role: Role,
  }) {
    return this.axiosRequest<User>({
      url: `/users/${userId}`,
      method: 'PUT',
      body,
    })
  }

  // /**
  //  * Portfolios
  //  */

  async checkInvestor(investorEmail: string) {
    return this.axiosRequest<{ id: number }>({
      url: '/users/check',
      method: 'POST',
      body: {
        email: investorEmail,
      },
    })
  }

  async getUsersPortfolios() {
    return this.axiosRequest<PortfolioTypes>({
      url: '/portfolios',
      method: 'GET',
    })
  }

  async getPortfolio(portfolioId: string | number) {
    return this.axiosRequest<Portfolio>({
      url: `/portfolios/${portfolioId}`,
      method: 'GET',
    })
  }

  async createPortfolio(body: {
    name: string,
    description: string,
    color: string,
    url: string,
    investorId: number | null,
  }) {
    return this.axiosRequest<Portfolio>({
      url: '/portfolios/create',
      method: 'POST',
      body,
    })
  }

  async updatePortfolio(portfolioId: string, body: {
    name: string,
    description: string,
    color: string,
    url: string,
  }) {
    return this.axiosRequest<Portfolio>({
      url: `/portfolios/${portfolioId}`,
      method: 'PUT',
      body,
    })
  }

  // async linkPortfolio(portfolioId: number, body: {
  //   email: string,
  // }) {
  //   return this.axiosRequest<Portfolio>({
  //     url: `/portfolios/${portfolioId}/link`,
  //     method: 'PUT',
  //     body,
  //   })
  // }

  // async unlinkPortfolio(portfolioId: number) {
  //   return this.axiosRequest<Portfolio>({
  //     url: `/portfolios/${portfolioId}/unlink`,
  //     method: 'PUT',
  //   })
  // }

  // async confirmPortfolio(portfolioId: number) {
  //   return this.axiosRequest<Portfolio>({
  //     url: `/portfolios/${portfolioId}/confirm`,
  //     method: 'PUT',
  //   })
  // }

  // /**
  //  * Transactions
  //  */

  //  async createTransaction(body: {
  //   stockName: string;
  //   stockSector: string | null;
  //   transactionTime: string;
  //   transactionType: TransactionType;
  //   numShares: number;
  //   price: number;
  //   currency: string;
  //   execution: ExecutionType;
  //   commissions: number | null;
  //   notes: string | null;
  //   portfolioId: number;
  // }) {
  //   return this.axiosRequest<Transaction>({
  //     url: '/transactions',
  //     method: 'POST',
  //     body,
  //   })
  // }

  //  async updateTransaction(transactionId: number, body: {
  //   stockName: string;
  //   stockSector: string | null;
  //   transactionTime: string;
  //   transactionType: TransactionType;
  //   numShares: number;
  //   price: number;
  //   currency: string;
  //   execution: ExecutionType;
  //   commissions: number | null;
  //   notes: string | null;
  //   portfolioId: number;
  // }) {
  //   return this.axiosRequest<Transaction>({
  //     url: `/transactions/${transactionId}`,
  //     method: 'PUT',
  //     body,
  //   })
  // }

  // async deleteTransaction(transactionId: number) {
  //   return this.axiosRequest<Transaction>({
  //     url: `/transactions/${transactionId}`,
  //     method: 'DELETE',
  //   })
  // }
}

export default new RestApiClient();