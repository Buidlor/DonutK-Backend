const {OAuth2Client} = require('google-auth-library');
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleAuth(token) { 
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log("payload: ", payload);
    console.log("userid: ", userid);
    return payload;
}

module.exports = googleAuth;
