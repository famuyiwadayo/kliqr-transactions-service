export const createUserSql = (autogenerateId = false) =>
  !autogenerateId
    ? `
    INSERT INTO users(id, first_name, last_name, avatar, created_at, updated_at)
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *
`
    : `
    INSERT INTO users(first_name, last_name, avatar, created_at, updated_at)
    VALUES($1, $2, $3, $4, $5) RETURNING *
`;

export const getUsersSql = `SELECT * FROM users`;

export const getUserByIdSql = `SELECT * FROM users WHERE id = $1`;
