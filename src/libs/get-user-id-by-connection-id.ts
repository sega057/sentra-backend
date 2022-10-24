import {constants} from "../constants";
import {databaseService} from "../services/database.service";

export async function getUserIdByConnectionId(connectionId: string) {
    const params = {
        TableName: constants.DYNAMODB_TABLE,
        IndexName: constants.DYNAMODB_CONNECTION_USER_GSI,
        KeyConditionExpression: "connectionId = :id",
        ExpressionAttributeValues: { ":id": connectionId },
    };

    const queryResponse = await databaseService.query(params);
    const item = queryResponse.Items[0];
    return item.PK.split("#")[1];
}