export class CustomError extends Error{
    status: number
    constructor(message:string,status:number){
        super(message);
        this.status = status
    }
}

export function createCustomError (msg:string,status:number){
    return new CustomError(msg,status)
}