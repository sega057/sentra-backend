import * as cognitoSdk from "amazon-cognito-identity-js";
import {constants} from "../constants";
import {getTokens, TokensResponse} from "@libs/get-tokens";
import {CognitoUserSession} from "amazon-cognito-identity-js";
import {CognitoJwtVerifier} from "aws-jwt-verify";
import {CognitoJwtVerifierSingleUserPool} from "aws-jwt-verify/cognito-verifier";
import {CognitoAccessTokenPayload} from "aws-jwt-verify/jwt-model";

class AuthService {
    private readonly userPool: cognitoSdk.CognitoUserPool;
    private readonly verifier: CognitoJwtVerifierSingleUserPool<{userPoolId: string, clientId: string, tokenUse: "access"}>;

    constructor() {
        const poolData = {
            UserPoolId: constants.COGNITO_USER_POOL,
            ClientId: constants.COGNITO_USER_POOL_CLIENT
        };

        this.verifier = CognitoJwtVerifier.create({
            userPoolId: poolData.UserPoolId,
            clientId: poolData.ClientId,
            tokenUse: "access",
        });
        this.userPool = new cognitoSdk.CognitoUserPool(poolData);
    }

    async authenticateUser(username: string, password: string): Promise<TokensResponse> {
        const authenticationData = {
            Username: username,
            Password: password
        };
        const authenticationDetails =
            new cognitoSdk.AuthenticationDetails(authenticationData);

        const userData = {
            Username: username,
            Pool: this.userPool
        };
        const cognitoUser = new cognitoSdk.CognitoUser(userData);

        return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (session: CognitoUserSession) => {
                    resolve(getTokens(session));
                },
                newPasswordRequired: function (userAttributes, _requiredAttributes) {
                    console.log("New password required callback");
                    // User was signed up by an admin and must provide new
                    // password and required attributes, if any, to complete
                    // authentication.
                    // This is not production ready and should be managed by the user
                    // on production environments.C

                    // the api doesn't accept this field back
                    delete userAttributes.email_verified;

                    // unsure about this field, but I don't send this back
                    delete userAttributes.phone_number_verified;

                    // Get these details and call
                    cognitoUser.completeNewPasswordChallenge(
                        authenticationDetails.getPassword(),
                        userAttributes,
                        this
                    );
                },
                onFailure: (error) => {
                    reject(error);
                }
            });
        });
    }

    async validateTokenId(tokenId: string): Promise<CognitoAccessTokenPayload> {
        try {
            return this.verifier.verify(tokenId);
        } catch (err) {
            // TODO handle different errors
            console.log("Token not valid!");
            throw err;
        }
    }

    async refreshToken(username: string, refreshToken: string): Promise<TokensResponse> {
        const userData = {
            Username: username,
            Pool: this.userPool
        };
        const cognitoUser = new cognitoSdk.CognitoUser(userData);

        const cognitoRefreshToken = new cognitoSdk.CognitoRefreshToken({RefreshToken: refreshToken});
        // console.log(refreshToken);
        // console.log(refreshToken.getToken());

        return new Promise((resolve, reject) => {
            cognitoUser.refreshSession(cognitoRefreshToken, (err, session) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(getTokens(session));
                }
            });
        });
    }
}

export const authService = new AuthService();
