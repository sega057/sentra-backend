import {generateAllow} from "@libs/policy-generation";
import {APIGatewayRequestAuthorizerEvent} from "aws-lambda";
// import {authService} from "../../services/auth.service";
import {constants} from "../../constants";
import {CognitoJwtVerifier} from "aws-jwt-verify";

export const authWsConnection = async (event: APIGatewayRequestAuthorizerEvent, context) => {
    const methodArn = event.methodArn;
    const tokenId = event.queryStringParameters.Authorizer;
    const username = event.queryStringParameters.Username;
    if (!tokenId || !username) {
        return context.fail('Unauthorized');
    }

    try {
        const verifier = CognitoJwtVerifier.create({
            userPoolId: constants.COGNITO_USER_POOL,
            clientId: constants.COGNITO_USER_POOL_CLIENT,
            tokenUse: "id",
        });

        const tokenPayload = await verifier.verify(tokenId);

        if (tokenPayload["cognito:username"] === username) {
            return context.succeed(generateAllow('me', methodArn));
        }
        await Promise.reject("Wrong username data provided");
    } catch (err) {
        console.error(`auth-websocket-error: ${err}`);
        context.fail(err);
    }

};

export const main = authWsConnection;

// export const authWsConnection1 = async (event, context) => {
//     // Read input parameters from event
//     const methodArn = event.methodArn;
//     const token = event.queryStringParameters.Authorizer;
//
//     if (!token) {
//         return context.fail('Unauthorized');
//     } else {
//         // Get the kid from the headers prior to verification
//         const sections = token.split('.');
//         let header = jose.util.base64url.decode(sections[0]);
//         header = JSON.parse(header);
//         const kid = header.kid;
//
//         // Fetch known valid keys
//         const rawRes = await fetch(CONSTANTS.KEYS_URL);
//         const response = await rawRes.json();
//
//         if (rawRes.ok) {
//             const keys = response['keys'];
//             const foundKey = keys.find((key) => key.kid === kid);
//
//             if (!foundKey) {
//                 context.fail('Public key not found in jwks.json');
//             } else {
//                 try {
//                     const result = await jose.JWK.asKey(foundKey);
//                     const keyVerify = jose.JWS.createVerify(result);
//                     const verificationResult = await keyVerify.verify(token);
//
//                     const claims = JSON.parse(verificationResult.payload);
//
//                     // Verify the token expiration
//                     const currentTime = Math.floor(Number(new Date()) / 1000);
//                     if (currentTime > claims.exp) {
//                         console.error('Token expired!');
//                         context.fail('Token expired!');
//                     } else if (claims.aud !== CONSTANTS.COGNITO_USER_POOL_CLIENT) {
//                         console.error('Token wasn\'t issued for target audience');
//                         context.fail('Token was not issued for target audience');
//                     } else {
//                         context.succeed(generateAllow('me', methodArn));
//                     }
//                 } catch (error) {
//                     console.error('Unable to verify token', error);
//                     context.fail('Signature verification failed');
//                 }
//             }
//         }
//     }
// };
