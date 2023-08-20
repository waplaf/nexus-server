import { PrismaClient } from '@prisma/client';
import { decodedHash } from '../controller.js'

const prisma = new PrismaClient()



async function draft ( title, userId )
{

    try
    {
        var result = await prisma.$queryRaw`SELECT * FROM  drafts WHERE title=${ title } and userId = ${ userId }; `


        console.log( result[ 0 ].id, '66W' )
        if ( result[ 0 ].id > 0 )
        {
            console.log( true )

            return true;
        } else
        {
            console.log( true )
            return false;

        }
    } catch ( error )
    {
        return false;

    }
}



const saveDraft = async ( req, res ) =>
{
    var { title, value, token } = req.body;
    const userId = parseInt( decodedHash( token ) )

    if ( true == await draft( title, userId ) )
    {

        let resu = await prisma.$executeRaw`UPDATE  drafts  SET value = ${ value } WHERE title=${ title } and userId = ${ userId };`;
        if ( resu > 0 )
        {
            res.send( true )
        } else
        {
            res.send( false )
        }
    }

    else
    {
        const result = await prisma.draft.create( {
            data: {
                title, value, userId
            }
        } );


        if ( result.id > 0 )
        {
            res.send( true )
        } else
        {
            res.send( false )


        }
    }

}

export { saveDraft }