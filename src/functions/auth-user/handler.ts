// import {APIGatewayProxyHandler} from "aws-lambda";
// import {authService} from "../../services/auth.service";
// import {generateResponse} from "../../models/response.model";
//
// // currently useless function
// const authUser: APIGatewayProxyHandler = async (event) => {
//     try {
//         const { username, password } = JSON.parse(event.body ?? "{}");
//
//         if (!username || !password) {
//             const message = 'Username and password must be provided for user authentication.';
//             console.error(message);
//
//             return generateResponse({
//                 code: 500,
//                 message,
//             });
//         }
//
//         const { tokenId, refreshToken } = await authService.authenticateUser(username, password);
//         const response = {
//             tokenId,
//             refreshToken,
//             username,
//         };
//
//         return generateResponse({
//             code: 200,
//             data: response,
//         });
//     } catch (error) {
//         console.error(error);
//         return generateResponse({
//             code: 500,
//             message: "Unable to authenticate user",
//         });
//     }
// };
//
// export const main = authUser;