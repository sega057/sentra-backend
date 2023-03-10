import {constants} from "../../constants";
// import {databaseService} from "../../services/database.service";
import {getUserIdByConnectionId} from "@libs/get-user-id-by-connection-id";
import {connectionService} from "../../services/connection.service";
import {generateResponse} from "../../models/response.model";
import {APIGatewayProxyHandler} from "aws-lambda";

const handleSocketDefault: APIGatewayProxyHandler = async (event) => {
    try {
        const connectionId = event.requestContext.connectionId;
        if (!connectionId) {
            return generateResponse({
                code: 400,
                message: 'Bad request',
            });
        }
        const userId = await getUserIdByConnectionId(connectionId);

        console.log("socket api url: ", constants.WEBSOCKET_API_ENDPOINT);

        // const data = JSON.parse(event.body);
        // const action = data.action;

        const apiGwResponse = await connectionService.generateSocketMessage(
            connectionId,
            `Hello, ${userId}, ${event.body}`,
            userId
        );
        console.log("apiGwResponse", apiGwResponse);
        // switch (action) {
        //     case 'PING':
        //         const pingResponse = JSON.stringify({action: 'PING', value: 'PONG'});
        //         // await apiGatewayConnector.generateSocketMessage(connectionId, pingResponse);
        //         break;
        //     default:
        //         const invalidResponse = JSON.stringify({action: 'ERROR', error: 'Invalid request'});
        //         // await apiGatewayConnector.generateSocketMessage(connectionId, invalidResponse);
        // }

        return generateResponse({
            code: 200,
            message: 'Default socket response.',
        })
    } catch (err) {
        console.error('Unable to generate default response', err);
        return generateResponse({
            code: 500,
            message: 'Unable to generate default response',
        });
    }
};

export const main = handleSocketDefault;