import type { AWS } from '@serverless/typescript';
// import {authUserConfig} from "@functions/auth-user";
// import {refreshTokenConfig} from "@functions/refresh-token";
import {handleSocketConnectConfig} from "@functions/ws-connect";
import {handleSocketDisconnectConfig} from "@functions/ws-disconnect";
import {authWsConnectionConfig} from "@functions/auth-ws-connection";
import {handleSocketDefaultConfig} from "@functions/ws-default";
import {handleCognitoPostConfirmationConfig} from "@functions/congnito-post-confirmation";
import {searchChatsByNameConfig} from "@functions/application/search-users-by-username";

export const functions: AWS["functions"] = {
    // authUser: authUserConfig,
    // refreshToken: refreshTokenConfig,
    authWsConnection: authWsConnectionConfig,
    handleSocketConnect: handleSocketConnectConfig,
    handleSocketDisconnect: handleSocketDisconnectConfig,
    handleSocketDefault: handleSocketDefaultConfig,
    handleCognitoPostConfirmation: handleCognitoPostConfirmationConfig,
    searchChatsByName: searchChatsByNameConfig,
};