import {CognitoUserSession} from "amazon-cognito-identity-js";

export interface TokensResponse {
    accessToken: string;
    refreshToken: string;
    tokenId: string;
}

export const getTokens = (session: CognitoUserSession): TokensResponse => {
    // According to the official docs, in order to authenticate via API GW
    // you don't use the access token but the token id instead.
    // https://docs.aws.amazon.com/en_en/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html
    const accessToken = session.getAccessToken().getJwtToken();
    const refreshToken = session.getRefreshToken().getToken();
    const tokenId = session.getIdToken().getJwtToken();

    return {
        accessToken,
        refreshToken,
        tokenId,
    };
};