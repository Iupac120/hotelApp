
import config from "config"
import nodemailer from "nodemailer"

export async function sendEmail (subject:string,message:string,send_to:string,sent_from:string,reply_to:string){
    //const testAccount = await nodemailer.createTestAccount()
    const transporter = await nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:config.get<string>("user"),
            pass:config.get<string>("pass")
        }
    })
    const options = {
        from:sent_from,
        to:send_to,
        replyTo:reply_to,
        subject:subject,
        html:message
    } 
    const info = await transporter.sendMail(options)

    console.log(`message:${nodemailer.getTestMessageUrl(info)}`)
}