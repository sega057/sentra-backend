export const dynamoDbTable = {
    DynamoDbTable: {
        Type: 'AWS::DynamoDB::Table',
        // DeletionPolicy: 'Retain',
        Properties: {
            TableName: "${self:custom.dynamodb_table}",
            AttributeDefinitions: [
                { AttributeName: "PK", AttributeType: "S" },
                { AttributeName: "SK", AttributeType: "S" },
                { AttributeName: "lastReadId", AttributeType: "S" },
                { AttributeName: "connectionId", AttributeType: "S" },
                { AttributeName: "username", AttributeType: "S" },
                // { AttributeName: "type", AttributeType: "S" },
                // { AttributeName: "createdAt", AttributeType: "N" },
                // { AttributeName: "authorId", AttributeType: "S" },
                // { AttributeName: "content", AttributeType: "S" },
                // { AttributeName: "joinedAt", AttributeType: "N" },
                // { AttributeName: "role", AttributeType: "S" },
                // { AttributeName: "chatName", AttributeType: "S" },
                // { AttributeName: "chatInfo", AttributeType: "S" },
                // { AttributeName: "firstName", AttributeType: "S" },
                // { AttributeName: "lastName", AttributeType: "S" },
                // { AttributeName: "email", AttributeType: "S" },
                // { AttributeName: "login", AttributeType: "S" },
                // { AttributeName: "password", AttributeType: "S" },
                // { AttributeName: "userInfo", AttributeType: "S" },
                // { AttributeName: "userStatus", AttributeType: "S" },
            ],
            KeySchema: [
                { AttributeName: "PK", KeyType: "HASH" },
                { AttributeName: "SK", KeyType: "RANGE" },
            ],
            BillingMode: "PROVISIONED",
            ProvisionedThroughput: {
                ReadCapacityUnits: "${self:custom.table_throughput}",
                WriteCapacityUnits: "${self:custom.table_throughput}",
            },
            GlobalSecondaryIndexes: [
                {
                    IndexName: "${self:custom.dynamodb_member_chat_gsi}",
                    KeySchema: [
                        { AttributeName: "SK", KeyType: "HASH" },
                        { AttributeName: "lastReadId", KeyType: "RANGE" },
                    ],
                    Projection: {
                        ProjectionType: "INCLUDE",
                        NonKeyAttributes: [ "PK" ],
                    },
                    ProvisionedThroughput: {
                        ReadCapacityUnits: "${self:custom.table_throughput}",
                        WriteCapacityUnits: "${self:custom.table_throughput}",
                    },
                },
                {
                    IndexName: "${self:custom.dynamodb_connection_user_gsi}",
                    KeySchema: [
                        { AttributeName: "connectionId", KeyType: "HASH" },
                        { AttributeName: "PK", KeyType: "RANGE" },
                    ],
                    Projection: {
                        ProjectionType: "KEYS_ONLY",
                    },
                    ProvisionedThroughput: {
                        ReadCapacityUnits: "${self:custom.table_throughput}",
                        WriteCapacityUnits: "${self:custom.table_throughput}",
                    },
                },
                {
                    IndexName: "${self:custom.dynamodb_username_id_gsi}",
                    KeySchema: [
                        { AttributeName: "SK", KeyType: "HASH" },
                        { AttributeName: "username", KeyType: "RANGE" },
                    ],
                    Projection: {
                        ProjectionType: "INCLUDE",
                        NonKeyAttributes: [ "PK" ],
                        // TODO get full name, user photo
                    },
                    ProvisionedThroughput: {
                        ReadCapacityUnits: "${self:custom.table_throughput}",
                        WriteCapacityUnits: "${self:custom.table_throughput}",
                    },
                },
            ],
        },
    },
};