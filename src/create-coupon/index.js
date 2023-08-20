import { PrismaClient } from '@prisma/client';
import { decodedHash, encodeHash } from '../controller.js';

const prisma = new PrismaClient();

const createCoupon = async ( req, res ) =>
{
    const { token } = req.body
    var { id } = await prisma.affiliate.create( {
        data: { userId: parseInt( decodedHash( token ) ) }
    } );

    if ( id < 1 ) return res.send( false )

    var { id: inviteId } = await prisma.invite.create( {
        data: { affiliateId: id }
    } );

    res.send( { id: inviteId } )

    await prisma.$disconnect()
}


export { createCoupon }