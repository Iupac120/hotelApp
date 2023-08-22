import {date, object,string,TypeOf} from 'zod';

export const createUserSchema =  object({
    body: object({
        username:string({required_error:"Name is required"}),
        password:string({required_error:'Pasword is required'}).min(6,"Password is too short. The minimum char is 6"),
        passwordConfirmation:string({required_error:"Password confirmation is required"}),
        email:string({required_error:'Email is required'}).email('Not a valid email')
    }).refine(data => data.password === data.passwordConfirmation,{
        message:"Passwords do not match",
        path:["passwordConfirmation"] //It compares in the confirm to invoke error message
    })
})
export const userEmailSchema =  object({
    body: object({  
        email:string({required_error:'Email is required'}).email('Not a valid email')
    })
})
export const resetPasswordSchema =  object({
    body: object({
        password:string({required_error:'Pasword is required'}).min(6,"Password is too short. The minimum char is 6"),
        passwordConfirmation:string({required_error:"Password confirmation is required"}),
        email:string({required_error:'Email is required'}).email('Not a valid email')
    }).refine(data => data.password === data.passwordConfirmation,{
        message:"Passwords do not match",
        path:["passwordConfirmation"] //It compares in the confirm to invoke error message
    })
})
export const otpVerifySchema =  object({
    body: object({
        otp:string({required_error:'OTP code is required'}),
        email:string({required_error:'Email is required'}).email('Not a valid email')
    })
})
//what type of req body should the route expect
export type createUserInput = Omit<TypeOf<typeof createUserSchema>,"body.passwordConfirmation">; 