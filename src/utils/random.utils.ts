export async function generateOtp (){
    return `${Math.floor(Math.random()*9000)}`
}