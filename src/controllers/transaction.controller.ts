import { NextFunction, Request, Response } from "express";
import TransactionService from "../services/transaction.service";
import { sendError, sendResponse } from "../utils";

const service = new TransactionService();
export default class TransactionController {
  async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.getTransactions();
      sendResponse(res, 200, result);
    } catch (error) {
      sendError(error, next);
    }
  }

  async getTransactionById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.getTransactionById(req.params.id);
      sendResponse(res, 200, result ?? {});
    } catch (error) {
      sendError(error, next);
    }
  }

  async getTransactionsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.getTransactionsByUserId(req.params.id);
      sendResponse(res, 200, result);
    } catch (error) {
      sendError(error, next);
    }
  }

  async getTotalUserTxByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.getTotalUserTxByUserId(req.params.id);
      sendResponse(res, 200, {count: +result});
    } catch (error) {
      sendError(error, next);
    }
  }
  
  async getTotalUserSpentAndInomeByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.getTotalUserSpentAndIncome(req.params.id);
      sendResponse(res, 200, result);
    } catch (error) {
      sendError(error, next);
    }
  }

  async getUserSpentAndInomeAndTxCount(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.getUserSpentIncomeAndTxCount(req.params.id);
      sendResponse(res, 200, result);
    } catch (error) {
      sendError(error, next);
    }
  }

  async getSimilarUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.getSimilarUsersByUserId(req.params.id);
      sendResponse(res, 200, result);
    } catch (error) {
      sendError(error, next);
    }
  }

  async createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.createTransaction(req.body);
      sendResponse(res, 201, result);
    } catch (error) {
      sendError(error, next);
    }
  }

  async batchCreateTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      if (!Array.isArray(req.body.input))
        throw new Error("Input must be an array");
      const result = await service.batchCreateTransaction(req.body.input);
      sendResponse(res, 201, result);
    } catch (error) {
      sendError(error, next);
    }
  }

  async batchCreateTransactionsFromCsv(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await service.batchCreateTransactionFromCsv(req.file);
      sendResponse(res, 201, result);
    } catch (error) {
      sendError(error, next);
    }
  }
}
