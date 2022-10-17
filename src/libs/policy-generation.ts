const generatePolicy = function (principalId, effect, resource) {
    const authResponse: Record<string, any> = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        const policyDocument: Record<string, any> = {};
        // default version
        policyDocument.Version = "2012-10-17";
        policyDocument.Statement = [];
        const statementOne: Record<string, any> = {};
        // default action
        statementOne.Action = "execute-api:Invoke";
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
};

export const generateAllow = function (principalId, resource) {
    return generatePolicy(principalId, "Allow", resource);
};

export const generateDeny = function (principalId, resource) {
    return generatePolicy(principalId, "Deny", resource);
};