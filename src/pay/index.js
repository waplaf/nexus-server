import { PrismaClient } from '@prisma/client';
import { decodedHash, encodeHash } from '../controller.js';
import axios from 'axios';
const prisma = new PrismaClient()

const pay = async ( req, res ) =>
{
    const { token } = req.body;
    const userId = parseInt( decodedHash( token ) );

    const result = await prisma.pay.findMany( {
        orderBy: { createdAt: 'desc' },
        where: { userId }
    } );

    res.send( result )
    console.log( result )

}

const newpay = async ( req, res ) =>
{
    const { token, plan, price, phone } = req.body;
    const userId = parseInt( decodedHash( token ) );
    const { data } = await axios.get( `http://localhost/pay-mpesa/index.php?phone=${ phone }&price=${ price }` )
    const date = new Date();
    date.setMonth( date.getMonth() + 1 );
    const dateExpireAt = date.toISOString()
    if ( data.status == 201 | data.status == 200 )
    {

        const result = await prisma.pay.create( { data: { userId, price: parseFloat( price ), number: ( phone ), method: "M-Pesa", reference: data.reference, dateExpireAt } } )
        if ( result.id > 0 )
        {
            res.send( result )
            console.log( ( result ) )
        } else
        {
            res.send( false )
        }
    }


}


export { pay, newpay }