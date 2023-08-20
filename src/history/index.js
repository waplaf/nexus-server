
import { PrismaClient } from '@prisma/client';
import { decodedHash } from '../controller.js'
const prisma = new PrismaClient()

const history = async ( req, res ) =>
{
    const result = await prisma.draft.findMany( {} )

    res.send( result )
}

const getHistory = async ( req, res ) =>
{
    const result = await prisma.draft.findUnique( {
        where: {
            id: parseInt( req.query.id )
        }
    } )
    console.log( req.query.lucas )
    res.send( result )
}




export { history, getHistory }