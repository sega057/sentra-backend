// import {authService} from "../../services/auth.service";
// import {generateResponse} from "../../models/response.model";
//
// const refreshToken = async (event, _context) => {
//     try {
//         const data = JSON.parse(event.body);
//
//         const username = data.username;
//         const refreshToken = data.refreshToken;
//
//         if (!username || !refreshToken) {
//             const error = "The username and refreshToken must be provided.";
//             console.error(error);
//             return generateResponse({
//                 code: 500,
//                 message: error,
//             });
//         } else {
//             const result = await authService.refreshToken(username, refreshToken);
//             const response = {
//                 token: result.tokenId,
//                 refresh: result.refreshToken,
//                 username,
//             };
//
//             return generateResponse({
//                 code: 200,
//                 data: response,
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         return generateResponse({
//             code: 500,
//             message: "Unable to refresh user token",
//         });
//     }
// };
//
// export const main = refreshToken;