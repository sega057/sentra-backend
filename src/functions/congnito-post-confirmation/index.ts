import { handlerPath } from '@libs/handler-resolver';
import {EventTrigger} from "../../interfaces/cognito";

export const handleCognitoPostConfirmationConfig = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "LAMBDA_${self:service}_cognito_post_confirmation_${opt:stage, self:provider.stage}",
    events: [
        {
            cognitoUserPool: {
                pool: "SentraPool",
                trigger: EventTrigger.PostConfirmation,
                // existing: true,
                // forceDeploy: true,
            }
        }
    ]
};
