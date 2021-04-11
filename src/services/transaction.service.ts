import { createTransactionDto } from "../interfaces/dtos/transaction.dto";
import UserRepository from "../repositories/transaction.repo";
import { getCsvData } from "../utils/getCsvData";

export default class UserService {
  repo = new UserRepository();

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
    return await this.repo.getTransactionById(id);
  }
}
