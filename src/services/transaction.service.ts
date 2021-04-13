import { createTransactionDto } from "../interfaces/dtos/transaction.dto";
import TransactionRepository from "../repositories/transaction.repo";
import { createError, getCsvData } from "../utils";

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
}
