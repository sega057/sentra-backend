import { handlerPath } from '@libs/handler-resolver';

export const handleSocketDisconnectConfig = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "LAMBDA_${self:service}_socket_disconnect_${opt:stage, self:provider.stage}",
    events: [
        {
            websocket: {
                route: "$disconnect"
            }
        }
    ]
};
