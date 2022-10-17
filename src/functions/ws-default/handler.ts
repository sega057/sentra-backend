import {constants} from "../../constants";

const handleSocketDefault = async (_event, _context) => {
    try {
        // const data = JSON.parse(event.body);
        // const action = data.action;
        //
        // const connectionId = event.requestContext.connectionId;
        // switch (action) {
        //     case 'PING':
        //         const pingResponse = JSON.stringify({action: 'PING', value: 'PONG'});
        //         await apiGatewayConnector.generateSocketMessage(connectionId, pingResponse);
        //         break;
        //     default:
        //         const invalidResponse = JSON.stringify({action: 'ERROR', error: 'Invalid request'});
        //         await apiGatewayConnector.generateSocketMessage(connectionId, invalidResponse);
        // }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': constants.CORS_ORIGIN
            },
            body: 'Default socket response.'
        };
    } catch (err) {
        console.error('Unable to generate default response', err);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': constants.CORS_ORIGIN
            },
            body: 'Default socket response error.'
        }
    }
};

export const main = handleSocketDefault;