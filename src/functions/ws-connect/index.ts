import { handlerPath } from '@libs/handler-resolver';
import {authWsConnection} from "@functions/auth-ws-connection/handler";

export const handleSocketConnectConfig = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "LAMBDA_${self:service}_socket_connect_${opt:stage, self:provider.stage}",
    events: [
        {
            websocket: {
                route: "$connect",
                authorizer: {
                    name: authWsConnection.name,
                    identitySource: [
                        "route.request.querystring.Authorizer"
                    ]
                }
            }
        }
    ]
};
