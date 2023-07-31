export const checkEmail:string= "SELECT * FROM users  WHERE email = $1"
export const addUser:string= "INSERT INTO users (username, email, password,token,token_expires_at) VALUES($1, $2, $3, $4, $5) RETURNING *"
