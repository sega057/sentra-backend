import { handlerPath } from '@libs/handler-resolver';

export const authUserConfig = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "LAMBDA_${self:service}_auth_user_${opt:stage, self:provider.stage}",
    events: [
        {
            http: {
                path: "auth",
                method: "post",
                cors: {
                    origin: "${self:custom.corsOrigin}"
                }
            }
        }
    ]
};
