import jwt from 'jsonwebtoken'

const jwtKey = "Lnucasf_Aflbefrto_Fulano888w88w_9w9w.9w9w9wx.";



const encodeHash = ( id ) =>
{

    const jwtExpirySeconds = 3000
    return jwt.sign( { id }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    } )
}

var decodedHash = ( token ) =>
{
    return parseInt( jwt.decode( token, jwtKey ).id )
}


export { encodeHash, decodedHash }
