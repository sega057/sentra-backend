import {constants} from "../../constants";
import {databaseService, PutItem} from "../../services/database.service";
import {UserDbFields} from "../../enums/user-db-fields";
import {PostConfirmationTriggerHandler} from "aws-lambda";

const handleCognitoPostConfirmation: PostConfirmationTriggerHandler = async (event) => {
    const { userName, request: { userAttributes: { email, preferred_username } } } = event;

    const params: PutItem = {
        TableName: constants.DYNAMODB_TABLE,
        Item: {
            PK: `USER#${userName}`,
            SK: UserDbFields.config,
            username: preferred_username,
            email,
            createdAt: Date.now(),
        },
    };

    try {
        await databaseService.create(params);
        return event;
    } catch (err) {
        console.error(err);
        throw new Error("Cognito post confirmation error");
    }
}

export const main = handleCognitoPostConfirmation;