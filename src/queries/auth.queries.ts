export const checkEmail: string= "SELECT s FROM user s WHERE s.email = $1"
export const addUser:string= "INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING username, email,password,created_at, updated_at"
