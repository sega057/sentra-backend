import {constants} from "../../constants";
import {APIGatewayProxyHandler} from "aws-lambda";
import {databaseService} from "../../services/database.service";
import {generateResponse} from "../../models/response.model";
import {UserDbFields} from "../../enums/user-db-fields";

const handleSocketConnect: APIGatewayProxyHandler = async (event) => {
    try {
        const connectionId = event.requestContext.connectionId;
        const username = event.queryStringParameters?.Username;
        if (!connectionId || !username) {
            return generateResponse({
                code: 400,
                message: 'Bad request',
            });
        }

        const params = {
            TableName: constants.DYNAMODB_TABLE,
            Key: {
                PK: `USER#${username}`,
                SK: UserDbFields.config,
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
        return generateResponse({
            code: 500,
            message: 'Unable to register socket.',
        });
    }
};

export const main = handleSocketConnect;