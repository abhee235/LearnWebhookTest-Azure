const Crypto = require('crypto');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const hmac = Crypto.createHmac("sha1", "EaFSPisTTvL34LDYW27bB2XjEFxRUraxaaJ66JISsYBUraIA1d3Olw==");   //Key is returned from function keys in azure function key and need to updated as secret of github webhook secret.
    const signature = hmac.update(JSON.stringify(req.body)).digest('hex');
    
    //will match the signature with githun x-hub-signature. github appends sha1=
    const shaSignature = `sha1=${signature}`;

    //github signature
    const gitHubSignature = req.headers['x-hub-signature'];

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    if (!shaSignature.localeCompare(gitHubSignature)) {
        if (req.body.pages[0].title) {
            context.res = {
                body: "Page is " + req.body.pages[0].title + ", Action is " + req.body.pages[0].action + ", Event Type is " + req.headers['x-github-event']
            };
        }
        else {
            context.res = {
                status: 400,
                body: ("Invalid payload for Wiki event")
            }
        }
    }
    else {
        context.res = {
            status: 401,
            body: "Signatures don't match"
        };
    }
}
