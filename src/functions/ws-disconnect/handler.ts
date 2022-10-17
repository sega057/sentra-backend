import {constants} from "../../constants";
import {databaseService} from "../../services/database.service";
import {generateResponse} from "../../models/response.model";

const handleSocketDisconnect = async (event, _context) => {
    try {
        // const connectionId = event.requestContext.connectionId;
        const username = event.queryStringParameters.Username;

        const params = {
            TableName: constants.DYNAMODB_TABLE,
            Key: {
                PK: `USER#${username}`,
                SK: "CONFIG",
            },
            UpdateExpression: "remove connectionId",
        };

        const response = await databaseService.update(params);
        console.log("remove connectionId", response);

        return generateResponse({
            code: 200,
            message: 'Socket successfully terminated.',
        });
    } catch (err) {
        console.error('Unable to terminate socket connection', err);
        return generateResponse({
            code: 500,
            message: 'Unable to terminate socket.',
        });
    }
};

export const main = handleSocketDisconnect;
