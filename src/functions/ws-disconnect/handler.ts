import {constants} from "../../constants";
import {databaseService} from "../../services/database.service";
import {generateResponse} from "../../models/response.model";
import {getUserIdByConnectionId} from "@libs/get-user-id-by-connection-id";

const handleSocketDisconnect = async (event, _context) => {
    try {
        const connectionId = event.requestContext.connectionId;
        const userId = await getUserIdByConnectionId(connectionId);

        const updateParams = {
            TableName: constants.DYNAMODB_TABLE,
            Key: {
                PK: `USER#${userId}`,
                SK: "CONFIG",
            },
            UpdateExpression: "remove connectionId",
        };

        const response = await databaseService.update(updateParams);
        console.log("remove connectionId", response);

        return generateResponse({
            code: 200,
            message: 'Socket successfully terminated.',
        });
    } catch (err) {
        console.error('Unable to terminate socket connection', err);
        return generateResponse({
            code: 500,
            message: 'Unable to terminate socket connection.',
        });
    }
};

export const main = handleSocketDisconnect;
