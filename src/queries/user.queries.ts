
export const getUsers:string = "SELECT * FROM users"
export const getUserById:string = "SELECT * FROM users WHERE user_id = $1"
export const deleteUserById:string = "DELETE FROM users WHERE user_id = $1"
export const updateUserById:string = "UPDATE users SET first_name = $1,last_name = $2, photo = $3, phone = $4, gender = $5, city = $6, address = $7, country_of_birth = $8, date_of_birth = $9 WHERE user_id = $10"
