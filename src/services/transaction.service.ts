import { createTransactionDto } from "../interfaces/dtos/transaction.dto";
import { UserSpentIncomeAndTxCountRo, UserTotalSpentAndIncomeRo } from "../interfaces/ros/transaction.ro";
import TransactionRepository from "../repositories/transaction.repo";
import { createError, getCsvData } from "../utils";
import * as _ from 'lodash';

export default class TransactionService {
  repo = new TransactionRepository();

  async createTransaction(input: createTransactionDto) {
    return await this.repo.createTransaction(input);
  }

  async batchCreateTransaction(data: createTransactionDto[]) {
    return await this.repo.batchCreateTransaction(data);
  }

  async batchCreateTransactionFromCsv(file: Express.Multer.File) {
    const data = await getCsvData(file);
    return await this.repo.batchCreateTransaction(data);
  }

  async getTransactions() {
    return await this.repo.getTransactions();
  }

  async getTransactionById(id: string) {
    const result = await this.repo.getTransactionById(id);
    if(!result) throw createError('Transaction not found', 404);
    return result;
  }

  async getTransactionsByUserId(id: string) {
    return await this.repo.getTransactionsByUserId(id);
  }

  async getTotalUserTxByUserId(userId: string): Promise<number> {
    const result = await this.repo.getTotalUserTxByUserId(userId);
    if(!result) return 0;
    return result;
  }

  async getTotalUserSpentAndIncome(userId: string): Promise<UserTotalSpentAndIncomeRo> {
    const result = await this.repo.getTotalSpentAndIncomeByUserId(userId);
    const arrValuesToObj = result.reduce(
      (acc, val) => Object.assign(acc, {[val.type]: val.sum}), 
    {}) as {credit: string, debit: string}
    return {spent: +arrValuesToObj.debit ?? 0, income: +arrValuesToObj.credit ?? 0};
  }

  async getUserSpentIncomeAndTxCount(userId: string): Promise<UserSpentIncomeAndTxCountRo> {
    const toRunInParallel: any = [this.getTotalUserSpentAndIncome(userId), this.getTotalUserTxByUserId(userId)];
    const result = await Promise.all(toRunInParallel);
    return {...result[0] as UserTotalSpentAndIncomeRo, count: +(result[1] as string)}
  }

  async getSimilarUsersByUserId_OLD(userId: string, trends?: string[]): Promise<any> {
    const toRunInParallel: any = [this.repo.getUserTxWithTheirCategories(), this.repo.getUserTxWithCategories(userId)]
    const result = await Promise.all(toRunInParallel);
    const ids: number[] = []

    for(const r of (result[0] as {categories: string; user_id: number}[])) {
      const categories = getUniqueFromString(r.categories);
      const intersection = _.intersection(categories, getUniqueFromString((result[1] as any).categories));
      // console.log(r.user_id,intersection.length >= 3)
      if(r.user_id !== +userId && intersection.length >= 3) ids.push(r.user_id)
    }
    return ids
  }

  async getSimilarUsersByUserId(userId: string, trends: string[]): Promise<number[]> {
    const users = await this.repo.getSimilarUsers(userId);
    const MAX_TREND_SIMILARITIES = 2; // SHOULD BE 3 THO BUH NO USER HAS UP TO 3 EXPENSE TRENDS
    const similar: any[] = [];
    for (const user of users) {
        const intersection = _.intersection(trends, user.categories)
        if(intersection.length >= MAX_TREND_SIMILARITIES) similar.push(user.user_id)
    }
    return similar;
  }

  async getUserTopFiveCategories(userId: string) {
    return await this.repo.getTopFiveCategoriesByUserId(userId);
  }
}

const getUniqueFromString = (data: string) => _.uniq(data.split(','));


