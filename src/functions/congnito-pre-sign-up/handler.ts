import {generateResponse} from "../../models/response.model";

const handlePreSignUp = (event, _context) => {
    console.log("event: ", JSON.stringify(event));

    try {
        return generateResponse({
            code: 200,
        });
    } catch (err) {
        console.error("Cognito pre sign up error: ", err);
        return generateResponse({
            code: 500,
            message: "Cognito pre sign up error",
        });
    }
}

export const main = handlePreSignUp;