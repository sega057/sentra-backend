import { handlerPath } from '@libs/handler-resolver';

export const refreshTokenConfig = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    name: "LAMBDA_${self:service}_auth_refresh_${opt:stage, self:provider.stage}",
    events: [
        {
            http: {
                path: "auth/refresh",
                method: "post",
                cors: {
                    origin: "${self:custom.corsOrigin}"
                }
            }
        },
    ],
};
