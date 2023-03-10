import { ApiGatewayManagementApi } from "aws-sdk";
import { constants } from "../constants";
import { databaseService } from "./database.service";
import {UserDbFields} from "../enums/user-db-fields";
import {AWSError} from "aws-sdk/lib/error";

class ApiGwService {
    readonly connector: ApiGatewayManagementApi;

    constructor() {
        const options = {
            endpoint: constants.WEBSOCKET_API_ENDPOINT
        };
        this.connector = new ApiGatewayManagementApi(options);
    }

    async generateSocketMessage(connectionId: string, data: string, userId: string) {
        try {
            return this.connector.postToConnection({
                ConnectionId: connectionId,
                Data: data,
            }).promise();
        } catch (error) {
            console.error('Unable to generate socket message', error);
            if ((error as AWSError)?.statusCode === 410) {
                console.log(`Removing stale connector ${connectionId}`);
                await this.removeStaleConnection(userId);
            }
        }
    }

    async removeStaleConnection(userId: string) {
        const params = {
            TableName: constants.DYNAMODB_TABLE,
            Key: {
                PK: `USER#${userId}`,
                SK: UserDbFields.config,
            },
            UpdateExpression: "remove connectionId",
        };

        try {
            await databaseService.update(params);
        } catch (error) {
            console.error('Unable to remove stale connection', error);
        }
    }
}

export const connectionService = new ApiGwService();
