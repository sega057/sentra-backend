import {generateAllow} from "@libs/policy-generation";
import {APIGatewayRequestAuthorizerHandler} from "aws-lambda";
import {CognitoJwtVerifier} from "aws-jwt-verify";

export const authWsConnection: APIGatewayRequestAuthorizerHandler = async (event) => {
    const methodArn = event.methodArn;
    const tokenId = event.queryStringParameters?.Authorizer;
    const username = event.queryStringParameters?.Username;

    if (!tokenId || !username) {
        throw new Error('Unauthorized');
    }

    try {
        const verifier = CognitoJwtVerifier.create({
            userPoolId: process.env.COGNITO_USER_POOL ?? "",
            clientId: process.env.COGNITO_USER_POOL_CLIENT ?? "",
            tokenUse: "id",
        });

        const tokenPayload = await verifier.verify(tokenId);

        if (tokenPayload["cognito:username"] === username) {
            return generateAllow('me', methodArn);
        }

        throw new Error('Unauthorized');
    } catch (err) {
        console.error(`auth-websocket-error: ${err}`);
        throw err;
    }

};

export const main = authWsConnection;
