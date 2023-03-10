export const cognitoPools = {
    CognitoUserPoolSentraPool: {
        Type: "AWS::Cognito::UserPool",
        // DeletionPolicy: "Retain",
        Properties: {
            UsernameAttributes: [
                "email",
            ],
            // AliasAttributes: [
            //     "email",
            // ],
            AutoVerifiedAttributes: [
                "email",
            ],
            VerificationMessageTemplate: {
                DefaultEmailOption: "CONFIRM_WITH_LINK"
            },
            MfaConfiguration: "OFF",
            UserPoolName: "${self:service}-cognito-${opt:stage, self:provider.stage}",
            Policies: {
                PasswordPolicy: {
                    MinimumLength: 6,
                    RequireLowercase: true,
                    RequireUppercase: true,
                    RequireNumbers: true,
                    RequireSymbols: true,
                },
            },
        },
    },
    CognitoUserPoolClient: {
        Type: "AWS::Cognito::UserPoolClient",
        Properties: {
            ClientName: "${self:service}-cognito-client-${opt:stage, self:provider.stage}",
            GenerateSecret: false,
            UserPoolId: {
                Ref: "CognitoUserPoolSentraPool"
            }
        }
    },
    CognitoUserPoolDomain: {
        Type : "AWS::Cognito::UserPoolDomain",
        Properties: {
            Domain: "sentra",
            UserPoolId: {
                Ref: "CognitoUserPoolSentraPool"
            },
        },
    },
};