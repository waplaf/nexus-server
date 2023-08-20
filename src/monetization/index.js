
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { decodedHash, encodeHash } from '../controller.js'
const prisma = new PrismaClient()



const myGain = async ( req, res ) =>
{
    const { token, invite } = req.body;
    const id = parseInt( invite )
    const user = decodedHash( token );



    var data = await prisma.$queryRaw`SELECT affiliates.userId, SUM(amount) as cashout FROM affiliates JOIN invite on invite.affiliateId=affiliates.id LEFT JOIN cashout p on p.userId=affiliates.userId WHERE invite.id=${ id } AND affiliates.userId=${ user }`
    let { userId, cashout } = data[ 0 ]
    if ( userId == user )
    {



        var result = await prisma.$queryRaw`SELECT sum(p.price*0.1) as amount, COUNT(u.id) as users FROM affiliates left JOIN invite i on i.affiliateId=affiliates.id left JOIN users u on u.inviteId=i.id left JOIN payments p on p.userId=u.id WHERE i.id=${ id }`;
        result = result[ 0 ]
        var result = JSON.stringify( result, ( _key, value ) =>
        {
            return typeof value === 'bigint' ? value = value.toString() : value
        } );

        let { amount, users } = JSON.parse( result )

        res.send( { cashout, userId, amount, users } );

    } else
    {
        res.send( false )

    }
}
export { myGain } 