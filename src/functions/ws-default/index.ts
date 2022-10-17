import { handlerPath } from '@libs/handler-resolver';

export const handleSocketDefaultConfig = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "LAMBDA_${self:service}_socket_default_${opt:stage, self:provider.stage}",
    events: [
        {
            websocket: {
                route: "$default"
            }
        }
    ]
};
