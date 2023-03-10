import { handlerPath } from '@libs/handler-resolver';

export const authWsConnectionConfig = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "LAMBDA_${self:service}_auth_websocket_connection_${opt:stage, self:provider.stage}",
    environment: {
        COGNITO_USER_POOL: "${self:custom.cognito_user_pool}",
        COGNITO_USER_POOL_CLIENT: "${self:custom.cognito_user_pool_client}",
    }
    // cors: {
    //     origin: "${self:custom.corsOrigin}"
    // }
};
