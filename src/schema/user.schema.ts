import {object,string,TypeOf} from 'zod';

export const createUserSchema =  object({
    body: object({
        name:string({
            required_error:"Name is required"
        }),
        password:string({required_error:'Pasword is required'}).min(6,"Password is too short. The minimum char is 6"),
        passwordConfirmation:string({required_error:"Password confirmation is required"}),
        email:string({required_error:'Email is required'}).email('Not a valid email')
    }).refine(data => data.password === data.passwordConfirmation,{
        message:"Passwords do not match",
        path:["passwordConfirmation"] //It compares in the confirm to invoke error message
    })
})
//what type of req body should the route expect
export type createUserInput = Omit<TypeOf<typeof createUserSchema>,"body.passwordConfirmation">; 