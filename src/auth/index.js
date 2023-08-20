
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { decodedHash, encodeHash } from '../controller.js'
const prisma = new PrismaClient()



const signup = async (req, res) => {

    const { name: username, email, password, inviteId } = req.body;

    var res1 = await prisma.user.findUnique({
        where: {
            email
        }
    });

    res1 = res1 == null | res1 == 'null' ? {} : res1


    if (res1.id > 0) return res.send('exist')
    let result = await prisma.User.create({
        data: {
            email, password: await bcrypt.hash(password, 10), username, inviteId: inviteId == '' | inviteId == null ? undefined : parseInt(inviteId)
        }
    })
    if (result.id > 0) {
        res.send(true)
    } else {
        res.send(false)
    }
    await prisma.$disconnect()

}



const signin = async (req, res) => {
    const { email, password } = req.body;
    var result = await prisma.$queryRaw`SELECT users.id, username,email,state,password,avatar,phone,plan, payments.dateExpireAt, invite.id as affiliatesId FROM users left JOIN affiliates on affiliates.userId=users.id left JOIN invite on invite.affiliateId=affiliates.id LEFT JOIN payments on payments.userId=users.id WHERE email=${String(email)} ORDER BY payments.id DESC LIMIT 1`

    result = result[0]

    if (result == '' || result == null) {
        res.send(false)
    } else {

        if (bcrypt.compareSync(String(password), String(result.password)) == true) {

            const { username, id, email, avatar, state, phone, affiliatesId, dateExpireAt } = result;
            const token = encodeHash(id)

            ///ol = oliva=o =dateExpireAt
            res.send({ username, id, email, avatar, state, token, phone, o: false, affiliatesId, dateExpireAt })

        }
        else {
            res.send(false)
        }

    }



    await prisma.$disconnect()


}



const getProfile = async (req, res) => {
    const { token } = req.body;
    const id = decodedHash(token)
    var result = await prisma.$queryRaw`SELECT users.id, username,email,state,avatar,phone,users.ExpirePay, invite.id as affiliatesId FROM 
    
    users left JOIN affiliates on affiliates.userId=users.id left JOIN invite on invite.affiliateId=affiliates.id WHERE id=${id}`

    result = result[0]

    if (result == '' || result == null) {
        res.send(false)
    } else if (result.id > 0) {
        res.send(result)
    } else {
        res.send(false)
    }


}

export { signup, signin, getProfile }