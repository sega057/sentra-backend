import {constants} from "../../constants";
// import {databaseService} from "../../services/database.service";
import {getUserIdByConnectionId} from "@libs/get-user-id-by-connection-id";
import {connectionService} from "../../services/connection.service";
import {generateResponse} from "../../models/response.model";

const handleSocketDefault = async (event, _context) => {
    try {
        const connectionId = event.requestContext.connectionId;
        const userId = await getUserIdByConnectionId(connectionId);
        console.log("socket api url: ", constants.WEBSOCKET_API_ENDPOINT);

        // const data = JSON.parse(event.body);
        // const action = data.action;

        const apigwResponse = await connectionService.generateSocketMessage(
            connectionId,
            `Hello, ${userId}, ${event.body}`,
        );
        console.log("apigwResponse", apigwResponse);
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
            message: "Default socket response error.",
        });
    }
};

export const main = handleSocketDefault;