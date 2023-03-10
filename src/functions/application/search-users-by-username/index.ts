import { handlerPath } from '@libs/handler-resolver';

export const searchChatsByNameConfig = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "LAMBDA_${self:service}_search-chats-by-name_${opt:stage, self:provider.stage}",
    events: [
        {
            websocket: {
                route: "searchChatsByName"
            }
        }
    ]
};
