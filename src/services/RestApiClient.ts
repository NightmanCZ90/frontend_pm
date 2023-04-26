import { ExecutionType, Portfolio, PortfolioTypes, Role, Tokens, Transaction, TransactionType, User } from '../types';
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
    const { data } = await this.axiosRequest<Tokens>({
      url: '/auth/signup',
      method: 'POST',
      body,
    });

    return data;
  }

  async signIn(body: {
    email: string,
    password: string,
  }) {
    const { data } = await this.axiosRequest<Tokens>({
      url: '/auth/signin',
      method: 'POST',
      body,
    });

    return data;
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
    const { data } = await this.axiosRequest<User>({
      url: '/users/current',
      method: 'GET'
    });

    return data;
  }

  async updateUser(userId: number, body: {
    firstName: string,
    lastName: string,
    role: Role,
  }) {
    const { data } = await this.axiosRequest<User>({
      url: `/users/${userId}`,
      method: 'PUT',
      body,
    });

    return data;
  }

  // /**
  //  * Portfolios
  //  */

  async checkInvestor(investorEmail: string) {
    const { data } = await this.axiosRequest<{ id: number }>({
      url: '/users/check',
      method: 'POST',
      body: {
        email: investorEmail,
      },
    });

    return data;
  }

  async getUsersPortfolios() {
    const { data } = await this.axiosRequest<PortfolioTypes>({
      url: '/portfolios',
      method: 'GET',
    });

    return data;
  }

  async getPortfolio(portfolioId: string | number) {
    const { data } = await this.axiosRequest<Portfolio>({
      url: `/portfolios/${portfolioId}`,
      method: 'GET',
    });

    return data;
  }

  async createPortfolio(body: {
    name: string,
    description: string,
    color: string,
    url: string,
    investorId: number | null,
  }) {
    const { data } = await this.axiosRequest<Portfolio>({
      url: '/portfolios/create',
      method: 'POST',
      body,
    });

    return data;
  }

  async updatePortfolio(portfolioId: string | number, body: {
    name: string,
    description: string,
    color: string,
    url: string,
  }) {
    const { data } = await this.axiosRequest<Portfolio>({
      url: `/portfolios/${portfolioId}`,
      method: 'PUT',
      body,
    });

    return data;
  }

  async deletePortfolio(portfolioId: string | number) {
    const result = await this.axiosRequest<void>({
      url: `/portfolios/${portfolioId}`,
      method: 'DELETE',
    });

    if (result.status === 204) return true;

    return false;
  }

  async linkPortfolio(portfolioId: string | number, body: {
    email: string,
  }) {
    const { data } = await this.axiosRequest<Portfolio>({
      url: `/portfolios/${portfolioId}/link`,
      method: 'PATCH',
      body,
    });

    return data;
  }

  async unlinkPortfolio(portfolioId: string | number) {
    const { data } = await this.axiosRequest<Portfolio>({
      url: `/portfolios/${portfolioId}/unlink`,
      method: 'PATCH',
    });

    return data;
  }

  // async confirmPortfolio(portfolioId: number) {
  //   return this.axiosRequest<Portfolio>({
  //     url: `/portfolios/${portfolioId}/confirm`,
  //     method: 'PUT',
  //   })
  // }

  /**
   * Transactions
   */

  async createTransaction(body: {
    stockName: string;
    stockSector: string | null;
    transactionTime: string;
    transactionType: TransactionType;
    numShares: number;
    price: number;
    currency: string;
    execution: ExecutionType;
    commissions: number | null;
    notes: string | null;
    portfolioId: number;
  }) {
    const { data } = await this.axiosRequest<Transaction>({
      url: '/transactions',
      method: 'POST',
      body,
    });

    return data;
  }

  async updateTransaction(transactionId: number, body: {
    stockName: string;
    stockSector: string | null;
    transactionTime: string;
    transactionType: TransactionType;
    numShares: number;
    price: number;
    currency: string;
    execution: ExecutionType;
    commissions: number | null;
    notes: string | null;
    portfolioId: number;
  }) {
    const { data } = await this.axiosRequest<Transaction>({
      url: `/transactions/${transactionId}`,
      method: 'PUT',
      body,
    });

    return data;
  }

  async deleteTransaction(transactionId: string | number) {
    return this.axiosRequest<Transaction>({
      url: `/transactions/${transactionId}`,
      method: 'DELETE',
    })
  }
}

export default new RestApiClient();