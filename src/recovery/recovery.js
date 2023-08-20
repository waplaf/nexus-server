
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { decodedHash } from '../controller.js'
import { sendMail } from '../send-mail/index.js';
const prisma = new PrismaClient()

const sendCodeRecovery = async (req, res) => {
    const { email } = req.body;
    let code = Math.floor(Math.random() * 900000) + 100000
    const expireAt = new Date(Date.now() + 60 * 15 * 1000);
    const result = await prisma.recovery.create({
        data: {
            email,
            code: String(code),
            expireAt
        }
    });

    if (result.id) {
        sendMail(email, "Recovery", `<div> 
        <p>
        Recebemos uma solicitação de recuperação de senha para a sua conta.<br/> Para confirmar essa solicitação, por favor, utilize o código de verificação abaixo:

        </>
<br/>
Código de Verificação: <h3 style='color:green'> ${code}</h3>


<p>
Este código é válido por 15 minutos. Se você não solicitou a recuperação da senha, por favor, ignore este e-mail.
</p>

        </div>` );
        res.send(true)
    } else {
        res.send(false)

    }

}

const resetConfirm = async (req, res) => {
    const { email, code } = req.body;
    var result = await prisma.recovery.deleteMany({
        where: { code, email }

    });

    if (result.count > 0) {


        res.send(true)
        console.log(result)
    } else {
        res.send(false)
    }

}


const reset = async (req, res) => {
    const { email, password } = req.body;
    var result = await prisma.user.updateMany({
        data: {
            password: await bcrypt.hash(password, 10)
        },

        where: { email }

    });
    console.log(result)

    if (result.count > 0) {


        res.send(true)
        console.log(result)
    } else {
        res.send(false)
    }

}

export { sendCodeRecovery, resetConfirm, reset }