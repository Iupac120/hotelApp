export const checkEmail:string= "SELECT * FROM users  WHERE email = $1"
export const addUser:string= "INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *"
