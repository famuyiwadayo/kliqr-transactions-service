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
