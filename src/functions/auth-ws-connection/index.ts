import { handlerPath } from '@libs/handler-resolver';

export const authWsConnectionConfig = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "LAMBDA_${self:service}_auth_websocket_connection_${opt:stage, self:provider.stage}",
    // cors: {
    //     origin: "${self:custom.corsOrigin}"
    // }
};
