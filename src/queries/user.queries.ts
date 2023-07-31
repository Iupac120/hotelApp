
export const getUsers:string = "SELECT * FROM users"
export const getUserById:string = "SELECT * FROM users WHERE user_id = $1"
export const deleteUserById:string = "DELETE FROM users WHERE user_id = $1"
export const updateUserById:string = "UPDATE users SET first_name = $1,last_name = $2, photo = $3, phone = $4, gender = $5, city = $6, address = $7, country_of_birth = $8, date_of_birth = $9 WHERE user_id = $10"
export const getUserByEmail:string = "SELECT * FROM users WHERE email = $1"
export const updateUserToken:string = "UPDATE users SET token = $1,token_expires_at = $2 WHERE user_id = $3"
export const updateTokenByQuery:string = "UPDATE users SET token = NULL, token_expires_at = NULL WHERE email = $1"
export const updateUserPassword:string ="UPDATE users SET password = $1 WHERE email = $2"