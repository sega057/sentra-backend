import {constants} from "../../constants";
import {APIGatewayProxyEvent} from "aws-lambda";
import {databaseService} from "../../services/database.service";
import {generateResponse} from "../../models/response.model";

const handleSocketConnect = async (event: APIGatewayProxyEvent, _context) => {
    try {
        const connectionId = event.requestContext.connectionId;
        const username = event.queryStringParameters.Username;
        // const connectionType = event.queryStringParameters.connectionType;

        const params = {
            TableName: constants.DYNAMODB_TABLE,
            Key: {
                PK: `USER#${username}`,
                SK: "CONFIG",
            },
            UpdateExpression: "set connectionId = :connectionId",
            ExpressionAttributeValues: {
                ":connectionId": connectionId,
            },
        };

        await databaseService.update(params);

        return generateResponse({
            code: 200,
            message: 'Socket successfully registered.',
        });
    } catch (err) {
        console.error('Unable to initialize socket connection', err);
        generateResponse({
            code: 500,
            message: 'Unable to register socket.',
        });
    }
};

export const main = handleSocketConnect;