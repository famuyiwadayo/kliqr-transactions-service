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

// USER TOTAL SPENT, INCOME AND TRANSACTION COUNT IN THE PAST 7 MONTH
// export const getTotalUserSpentAndIncomeValueByUserIdSql = `SELECT type, SUM(amount) FROM transactions WHERE user_id = $1 AND 
// date_time >= date_trunc('month', now()) - interval '7 month' and
// date_time < date_trunc('month', now()) GROUP BY type`;

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

export const getTopFiveCategoryFromEachMonthByUserIdSql = `
SELECT DISTINCT a.category, a.icon_url, COUNT(category) as count 
FROM (SELECT category, icon_url,
            DATE_TRUNC('month',date_time) AS category_month,
            COUNT(*) AS count
      FROM transactions WHERE user_id = $1 
      AND date_time >= date_trunc('month', now()) - interval '12 month' and
          date_time < date_trunc('month', now())
      GROUP BY category, icon_url, DATE_TRUNC('month', date_time)
     ) a 
GROUP BY a.category, a.icon_url
ORDER BY count DESC
LIMIT 5
`;