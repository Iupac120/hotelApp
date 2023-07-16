import {object,string,TypeOf} from 'zod';

export const createUserSchema =  object({
    body: object({
        name:string({
            required_error:"Name is required"
        }),
        password:string({required_error:'Pasword is required'}).min(6,"Password is too short. The minimum char is 6"),
        confirmPassword:string({required_error:"Password confirmation is required"}),
        email:string({required_error:'Email is required'}).email('Not a valid email')
    }).refine(data => data.password === data.confirmPassword,{
        message:"Passwords do not match",
        path:["confirmPassword"] //It compares in the confirm to invoke error message
    })
})

export type createUserInput = Omit<TypeOf<typeof createUserSchema>,"body.passwordConfirmation">; 