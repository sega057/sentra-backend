import {constants} from "../constants";
import {databaseService, QueryItemOutput} from "../services/database.service";

export async function getUserIdByConnectionId(connectionId: string): Promise<string> {
    const params = {
        TableName: constants.DYNAMODB_TABLE,
        IndexName: constants.DYNAMODB_CONNECTION_USER_GSI,
        KeyConditionExpression: "connectionId = :id",
        ExpressionAttributeValues: { ":id": connectionId },
    };

    try {
        const queryResponse: QueryItemOutput = await databaseService.query(params);
        const item = queryResponse.Items?.[0];
        if (!item) {
            console.error('Unable to get user id by connection id. No user found');
            throw new Error('No user found');
        }
        return item.PK.split("#")[1];
    } catch (error) {
        const errorMessage = `Unable to get user id by connection id. ${error}`
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
}