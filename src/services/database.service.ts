import * as AWS from 'aws-sdk';
import { generateResponse } from "../models/response.model";
import { StatusCode, ResponseMessage } from "../enums";
import {constants} from "../constants";

// export interface IConfig {
//     region: string;
//     accessKeyId?: string;
//     secretAccessKey?: string;
//     endpoint?: string;
// }

// Put
type PutItem = AWS.DynamoDB.DocumentClient.PutItemInput;
type PutItemOutput = AWS.DynamoDB.DocumentClient.PutItemOutput;

// Batch write
type BatchWrite = AWS.DynamoDB.DocumentClient.BatchWriteItemInput;
type BatchWriteOutPut = AWS.DynamoDB.DocumentClient.BatchWriteItemOutput;

// Update
type UpdateItem = AWS.DynamoDB.DocumentClient.UpdateItemInput;
type UpdateItemOutPut = AWS.DynamoDB.DocumentClient.UpdateItemOutput;

// Query
type QueryItem = AWS.DynamoDB.DocumentClient.QueryInput;
type QueryItemOutput = AWS.DynamoDB.DocumentClient.QueryOutput;

// Get
type GetItem = AWS.DynamoDB.DocumentClient.GetItemInput;
type GetItemOutput = AWS.DynamoDB.DocumentClient.GetItemOutput;

// Delete
type DeleteItem = AWS.DynamoDB.DocumentClient.DeleteItemInput;
type DeleteItemOutput = AWS.DynamoDB.DocumentClient.DeleteItemOutput;

type Item = {[index: string]: string};

// const config: IConfig = { region: constants.REGION };
// AWS.config.update(config);
// if (STAGE === DYNAMODB_LOCAL_STAGE) {
//     config.accessKeyId = DYNAMODB_LOCAL_ACCESS_KEY_ID; // local dynamodb accessKeyId
//     config.secretAccessKey = DYNAMODB_LOCAL_SECRET_ACCESS_KEY; // local dynamodb secretAccessKey
//     config.endpoint = DYNAMODB_LOCAL_ENDPOINT; // local dynamodb endpoint
// }
// const documentClient = new AWS.DynamoDB.DocumentClient();

class DatabaseService {
    private readonly documentClient: AWS.DynamoDB.DocumentClient;

    constructor() {
        this.documentClient = new AWS.DynamoDB.DocumentClient({
            region: constants.REGION,
        });
    }

    getItem = async ({ key, hash, hashValue, tableName}: Item) => {
        const params = {
            TableName: tableName,
            Key: {
                id: key,
            },
        }
        if (hash) {
            params.Key[hash] = hashValue;
        }
        const results = await this.get(params);
        if (Object.keys(results).length) {
            return results;
        }
        console.error('Item does not exist');

        throw generateResponse({
            code: StatusCode.BAD_REQUEST,
            message: ResponseMessage.INVALID_REQUEST,
            data: { id: key },
        });
    }

    create = async(params: PutItem): Promise<PutItemOutput> => {
        try {
            return this.documentClient.put(params).promise();
        } catch (error) {
            console.error(`create-error: ${error}`);
            throw generateResponse({
                code: 500,
                message: `create-error: ${error}`,
            });
        }
    }

    batchCreate = async(params: BatchWrite): Promise<BatchWriteOutPut> => {
        try {
            return this.documentClient.batchWrite(params).promise();
        } catch (error) {
            console.error(`batch-write-error: ${error}`);
            throw generateResponse({
                code: 500,
                message: `batch-write-error: ${error}`,
            });
        }
    }

    update = async (params: UpdateItem): Promise<UpdateItemOutPut> => {
        try {
            // result.Attributes
            return this.documentClient.update(params).promise();
        } catch (error) {
            console.error(`update-error: ${error}`);
            throw generateResponse({
                code: 500,
                message: `update-error: ${error}`,
            });
        }
    }

    query = async (params: QueryItem): Promise<QueryItemOutput> => {
        try {
            return this.documentClient.query(params).promise();
        } catch (error) {
            console.error(`query-error: ${error}`);
            throw generateResponse({
                code: 500,
                message: `query-error: ${error}`,
            });
        }
    }

    get = async (params: GetItem): Promise<GetItemOutput> => {
        console.log('DB GET - STAGE: ', constants.STAGE);
        console.log('DB GET - params.TableName: ', params.TableName);
        console.log('DB GET - params.Key: ', params.Key);

        try {
            return this.documentClient.get(params).promise();
        } catch (error) {
            console.error(`get-error - TableName: ${params.TableName}`);
            console.error(`get-error: ${error}`);
            throw generateResponse({
                code: 500,
                message: `get-error: ${error}`,
            });
        }
    }

    delete = async (params: DeleteItem): Promise<DeleteItemOutput> => {
        try {
            return this.documentClient.delete(params).promise();
        } catch (error) {
            console.error(`delete-error: ${error}`);
            throw generateResponse({
                code: 500,
                message: `delete-error: ${error}`,
            });
        }
    }

}

export const databaseService = new DatabaseService();