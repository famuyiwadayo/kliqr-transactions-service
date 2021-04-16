export interface TransactionRo {
  id: string | number;
  user_id: string | number;
  amount: number;
  type: string;
  category: string;
  icon_url: string;
  date_time: Date | number | string;
}

export interface UserTxCountRo {
  count: number;
}
export interface UserTotalSpentAndIncomeRo {
  spent: number; 
  income: number;
}

export interface UserSpentIncomeAndTxCountRo {
  spent: number; 
  income: number;
  count: number;
}

export interface UserTopFiveCategories {
  category: string; 
  icon_url: string; 
  count: number
}