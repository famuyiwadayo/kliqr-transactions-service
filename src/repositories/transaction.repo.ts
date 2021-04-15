import { createTransactionDto } from "../interfaces/dtos/transaction.dto";
import { TransactionRo, UserTotalSpentAndIncomeRo } from "../interfaces/ros/transaction.ro";
import {
  createTransactionSql,
  getTransactionsSql,
  getTransactionByIdSql,
  getTransactionsByUserIdSql,
  getTotalUserTransactionByUserIdSql,
  getTotalUserSpentAndIncomeValueByUserIdSql,
  getUserTxWithTheirCategoriesSql,
  getUserTxWithCategoryByUserIdSql
} from "../db/queries/transaction.query";
import { query } from "../db/db";

export default class TransactionRepository {
  async createTransaction(input: createTransactionDto): Promise<TransactionRo> {
    try {
      const values = [
        input.user_id,
        input.amount,
        input.type,
        input.category,
        input.icon_url,
        input.date_time,
      ];
      if (input.id) values.unshift(input.id);
      const result = await query(createTransactionSql(!!!input.id), values);
      return result.rows[0];
    } catch (error) {
      console.log(error.routine);
      if (error.routine === "_bt_check_unique")
        throw new Error("Transaction already exist");
      throw new Error(error);
    }
  }

  async batchCreateTransaction(data: createTransactionDto[]): Promise<TransactionRo[]> {
    const toRunInParallel: any[] = [];
    data.forEach((input) => toRunInParallel.push(this.createTransaction(input)));
    const result = (await Promise.all(toRunInParallel)) as TransactionRo[];
    return result;
  }

  async getTransactions(): Promise<TransactionRo[]> {
    return (await query(getTransactionsSql)).rows;
  }

  async getTransactionById(id: string): Promise<TransactionRo> {
    return (await query(getTransactionByIdSql, [id])).rows[0];
  }

  async getTransactionsByUserId(userId: string): Promise<TransactionRo[]> {
    return (await query(getTransactionsByUserIdSql, [userId])).rows
  }

  async getTotalUserTxByUserId(userId: string): Promise<number> {
    return (await query(getTotalUserTransactionByUserIdSql, [userId])).rows[0].count;
  }

  async getTotalSpentAndIncomeByUserId(userId: string): Promise<{type: string; sum: string}[]> {
    return (await query(getTotalUserSpentAndIncomeValueByUserIdSql, [userId])).rows;
  }

  async getUserTxWithTheirCategories(): Promise<any> {
    const result = (await query(getUserTxWithTheirCategoriesSql)).rows;
    return result;
  }

  async getUserTxWithCategories(userId: string): Promise<any> {
    const result = (await query(getUserTxWithCategoryByUserIdSql, [userId])).rows[0];
    return result;
  }

}
