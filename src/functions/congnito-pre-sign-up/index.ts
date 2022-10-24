import { handlerPath } from '@libs/handler-resolver';

enum EventTrigger {
    PreSignUp = "PreSignUp",
}

export const handleCognitoPreSignUpConfig = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "LAMBDA_${self:service}_cognito_pre_sign_up_${opt:stage, self:provider.stage}",
    events: [
        {
            cognitoUserPool: {
                pool: "${self:custom.cognito_user_pool_name}",
                trigger: EventTrigger.PreSignUp,
                // existing: true,
                // forceDeploy: true,
            }
        }
    ]
};
