import { ApiGatewayManagementApi } from "aws-sdk";
import { constants } from "../constants";

class ApiGwService {
    readonly connector: ApiGatewayManagementApi;

    constructor() {
        const options = {
            endpoint: constants.WEBSOCKET_API_ENDPOINT
        };
        this.connector = new ApiGatewayManagementApi(options);
    }

    async generateSocketMessage(connectionId, data) {
        try {
            return this.connector.postToConnection({
                ConnectionId: connectionId,
                Data: data
            }).promise();
        } catch (error) {
            console.error('Unable to generate socket message', error);
            if (error.statusCode === 410) {
                console.log(`Removing stale connector ${connectionId}`);
                // await databaseService.removeSocket(connectionId);
            }
        }
    }
}

export const connectionService = new ApiGwService();
