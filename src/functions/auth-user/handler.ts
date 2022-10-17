import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {authService} from "../../services/auth.service";
import {generateResponse} from "../../models/response.model";

const authUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const data = JSON.parse(event.body);

        const username = data.username;
        const password = data.password;

        if (!username || !password) {
            const error = 'Username and password must be provided for user authentication.';
            console.error(error);

            return generateResponse({
                code: 500,
                message: error,
            });
        } else {
            const { tokenId, refreshToken } = await authService.authenticateUser(username, password);
            const response = {
                tokenId,
                refreshToken,
                username,
            };

            return generateResponse({
                code: 200,
                data: response,
            });
        }
    } catch (error) {
        console.error(error);
        return generateResponse({
            code: 500,
            message: "Unable to authenticateUser user",
        });
    }
};

export const main = authUser;