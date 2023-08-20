import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import { signup, signin, getProfile } from './auth/index.js';
import { changeDataPersonal } from './personal-data/index.js';
import { newpay, pay } from './pay/index.js';
import { createCoupon } from './create-coupon/index.js';
import { myGain } from './monetization/index.js';
import { reset, resetConfirm, sendCodeRecovery } from './recovery/recovery.js';
import { saveDraft } from './save-draft/index.js';
import { getHistory, history } from './history/index.js';
const app = express()
app.use( cors() );
app.use( bodyParser.urlencoded( { extended: false, limit: '10mb' } ) );

app.post( '/signup', signup )
app.post( '/signin', signin )
app.post( '/change-profile', changeDataPersonal )
app.post( '/pay', pay )
app.post( '/new-pay', newpay )
app.post( '/create-coupon', createCoupon )
app.post( '/get-profile', getProfile )
app.post( '/get-my-gain', myGain )
app.post( '/send-recovery', sendCodeRecovery )
app.post( '/reset-confirm', resetConfirm )
app.post( '/new-password', reset );
app.post( '/save-draft', saveDraft )
app.get( '/get-history', history )
app.get( '/get-history-unique', getHistory )



let port = process.env.PORT || 3003;
app.listen( port, ( req, res ) =>
{
    console.log( 'Servidor Rodando' );
} );