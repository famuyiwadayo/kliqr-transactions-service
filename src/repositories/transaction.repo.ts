import { createTransactionDto } from "../interfaces/dtos/transaction.dto";
import { TransactionRo } from "../interfaces/ros/transaction.ro";
import {
  createUserSql,
  getUserByIdSql,
  getUsersSql,
} from "../db/queries/user.query";
import { query } from "../db/db";

export default class UserRepository {
  async createTransaction(input: createTransactionDto): Promise<TransactionRo> {
    try {
      const values = [
        input.first_name,
        input.last_name,
        input.avatar,
        input.created_at,
        input.updated_at,
      ];
      if (input.id) values.unshift(input.id);
      const result = await query(createUserSql(!!!input.id), values);
      return result.rows[0];
    } catch (error) {
      console.log(error.routine);
      if (error.routine === "_bt_check_unique")
        throw new Error("User already exist");
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
    const result = await query(getUsersSql);
    return result.rows;
  }

  async getTransactionById(id: string): Promise<TransactionRo> {
    const result = await query(getUserByIdSql, [id]);
    return result.rows[0];
  }

  async getTransactionsByUserId(userId: string): Promise<TransactionRo> {
    return {} as any;
  }

}
