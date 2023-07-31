
import config from "config"
import nodemailer from "nodemailer"

export async function sendEmail (subject:string,message:string,send_to:string,sent_from:string,reply_to:string){
    //const testAccount = await nodemailer.createTestAccount()
    let transporter = await nodemailer.createTransport({
        service:"gmail.com",
        auth:{
            user:config.get<string>("user"),
            pass:config.get<string>("pass")
        }
    })

    transporter.verify((err,success) => {
        if(err){
          console.log(err)
          console.log("error in transporter")
        }else{
          console.log('success')
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