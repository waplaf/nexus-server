import { PrismaClient } from '@prisma/client';
import { decodedHash, encodeHash } from '../controller.js';

const prisma = new PrismaClient()
const changeDataPersonal = async ( req, res ) =>
{
    const { token, email, phone, username } = req.body;
    const result = await prisma.user.update( {
        data: {
            username, email, phone
        },
        where: {
            id: decodedHash( token )
        }
    } );


    if ( result.id > 0 )
    {
        const { username, id, email, avatar, state, phone } = result;
        const token = encodeHash( id )
        res.send( { username, id, email, avatar, state, token, phone } )
    } else
    {
        res.send( false )
    }
    await prisma.$disconnect()
}
export { changeDataPersonal }