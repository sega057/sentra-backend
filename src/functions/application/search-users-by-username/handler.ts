import { APIGatewayProxyHandler } from "aws-lambda";
import { getUserIdByConnectionId } from "@libs/get-user-id-by-connection-id";
import { generateResponse } from "src/models/response.model";
import { connectionService } from "src/services/connection.service";
import { databaseService } from "src/services/database.service";
import { UserDbFields } from "src/enums/user-db-fields";
import { constants } from "../../../constants";

const searchChatsByName: APIGatewayProxyHandler = async (event) => {
    try {
        const connectionId = event.requestContext.connectionId;
        if (!connectionId) {
            return generateResponse({
                code: 400,
                message: 'Bad request',
            });
        }

        const { name } = JSON.parse(event.body ?? "{}");
        if (!name) {
            return generateResponse({
                code: 400,
                message: 'No name provided.',
            });
        }

        const userId = await getUserIdByConnectionId(connectionId);

        const params = {
            TableName: constants.DYNAMODB_TABLE,
            IndexName : constants.DYNAMODB_USERNAME_ID_GSI,
            KeyConditionExpression : "SK = :sk and begins_with(username, :username)",
            // FilterExpression: "PK <> :pk",
            ExpressionAttributeValues : {
                ":sk" : UserDbFields.config,
                ":username": name,
                // ":pk": `USER#${userId}`,
            },
            Limit: 10,
        };

        const users = await databaseService.query(params);
        console.log("users query response", users);

        await connectionService.generateSocketMessage(
            connectionId,
            JSON.stringify(users.Items),
            userId
        );

        return generateResponse({
            code: 200,
            message: 'searchChatsByName response.',
        });
    } catch (err) {
        console.error('Unable to searchChatsByName.', err);
        return generateResponse({
            code: 500,
            message: "searchChatsByName error.",
        });
    }
};

export const main = searchChatsByName;