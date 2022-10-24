import type { AWS } from '@serverless/typescript';
// import {authUserConfig} from "@functions/auth-user";
// import {refreshTokenConfig} from "@functions/refresh-token";
import {handleSocketConnectConfig} from "@functions/ws-connect";
import {handleSocketDisconnectConfig} from "@functions/ws-disconnect";
import {authWsConnectionConfig} from "@functions/auth-ws-connection";
import {handleSocketDefaultConfig} from "@functions/ws-default";
import {handleCognitoPreSignUpConfig} from "@functions/congnito-pre-sign-up";

export const functions: AWS["functions"] = {
    // authUser: authUserConfig,
    // refreshToken: refreshTokenConfig,
    authWsConnection: authWsConnectionConfig,
    handleSocketConnect: handleSocketConnectConfig,
    handleSocketDisconnect: handleSocketDisconnectConfig,
    handleSocketDefault: handleSocketDefaultConfig,
    handleCognitoPreSignUp: handleCognitoPreSignUpConfig,
    // greeting: {
    //     name: "LAMBDA_${self:service}_socket_greeting_${opt:stage, self:provider.stage}",
    //     handler: "handler.greeting",
    //     events: [
    //         {
    //             websocket: {
    //                 route: "GREETING"
    //             }
    //         }
    //     ]
    // },
};