import { APIGatewayAuthorizerResult, Statement } from "aws-lambda";

const generatePolicy = function (principalId: string, effect: string, resource: string): APIGatewayAuthorizerResult {
    const authResponse: APIGatewayAuthorizerResult = {
        principalId,
        policyDocument: {
            // default version
            Version: "2012-10-17",
            Statement: [],
        }
    };

    if (effect && resource) {
        const statementOne: Statement = {
            // default action
            Action: "execute-api:Invoke",
            Effect: effect,
            Resource: resource,
        };
        authResponse.policyDocument.Statement.push(statementOne);
    }

    return authResponse;
};

export const generateAllow = function (principalId: string, resource: string): APIGatewayAuthorizerResult {
    return generatePolicy(principalId, "Allow", resource);
};

export const generateDeny = function (principalId: string, resource: string): APIGatewayAuthorizerResult {
    return generatePolicy(principalId, "Deny", resource);
};