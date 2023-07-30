
import nodemailer from "nodemailer"

export async function sendLoginEmail ({email, url, token}:{
    email:string
    url: string
    token: string
}){
    const testAccount = await nodemailer.createTestAccount()
    const transporter = await nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:testAccount.user,
            pass:testAccount.pass
        }
    })
    const info = await transporter.sendMail({
        from:'"Austech Group" <iupac120@gmail.com>',
        to:email,
        subject:'Login to your account',
        html:`Login by clicking <a href="${url}/login#token=${token}">Here</a>`
    })

    console.log(`message:${nodemailer.getTestMessageUrl(info)}`)
}