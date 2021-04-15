export const createTransactionSql = (autogenerateId = false) =>
  !autogenerateId
    ? `
    INSERT INTO transactions(id, user_id, amount, type, category, icon_url, date_time)
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
`
    : `
    INSERT INTO transactions(user_id, amount, type, category, icon_url, date_time)
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *
`;

export const getTransactionsSql = `SELECT * FROM transactions`;

export const getTransactionByIdSql = `SELECT * FROM transactions WHERE id = $1`;

export const getTransactionsByUserIdSql = `SELECT * FROM transactions WHERE user_id = $1`;

export const getTotalUserTransactionByUserIdSql = `SELECT COUNT(*) FROM transactions WHERE user_id = $1`;

export const getTotalUserSpentAndIncomeValueByUserIdSql = `SELECT type, SUM(amount) FROM transactions WHERE user_id = $1 GROUP BY type`;


export const getUserTxWithTheirCategoriesSql = `
SELECT user_id, string_agg(a.category, ',') categories from 
(SELECT DISTINCT user_id, category, date_time from transactions WHERE date_time >= date_trunc('month', now()) - interval '5 month' and
      date_time < date_trunc('month', now())) a 
GROUP by user_id;
`;

export const getUserTxWithCategoryByUserIdSql = `
SELECT user_id, string_agg(a.category, ',') categories from 
(SELECT DISTINCT user_id, category, date_time from transactions WHERE date_time >= date_trunc('month', now()) - interval '5 month' and
      date_time < date_trunc('month', now())) a where user_id = $1
GROUP by user_id;
`;