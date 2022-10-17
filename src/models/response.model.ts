import {Status, StatusCode} from "../enums";
import {constants} from "../constants";

export type ResponseHeader = { [header: string]: string | number | boolean; }
export interface IResponseBody {
    message: string;
    data?: any;
    status?: string;
}
export interface IResponse {
    statusCode: number;
    headers: ResponseHeader;
    body: string;
}

const RESPONSE_HEADERS: ResponseHeader = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': constants.CORS_ORIGIN, // Required for CORS support to work
    'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
};

export const STATUS_MESSAGES = {
    [StatusCode.OK]: Status.SUCCESS,
    [StatusCode.BAD_REQUEST]: Status.BAD_REQUEST,
    [StatusCode.ERROR]: Status.ERROR,
}

export interface ResponseConfig {
    code: number;
    message?: string;
    data?: Record<string, any>;
    headers?: ResponseHeader;
}

export function generateResponse({
    code,
    message,
    data,
    headers = {},
}: ResponseConfig): IResponse {

    const body: IResponseBody = {
        message,
        data,
    };

    return {
        statusCode: code,
        headers: {
            ...RESPONSE_HEADERS,
            ...headers,
        },
        body: JSON.stringify(body),
    };
}

// export class ResponseModel {
//     private readonly body: IResponseBody;
//     private code: number;
//
//     constructor(code = StatusCode.BAD_REQUEST, message = '', data = {}) {
//         this.body = {
//             data: data,
//             message: message,
//             status: STATUS_MESSAGES[code],
//         };
//         this.code = code;
//     }
//
//     setBodyVariable = (variable: string, value: string): void => {
//         this.body[variable] = value;
//     }
//
//     setData = (data: any): void => {
//         this.body.data = data;
//     }
//
//     setCode = (code: number): void => {
//         this.code = code;
//     }
//
//     getCode = (): number => {
//         return this.code;
//     }
//
//     setMessage = (message: string): void => {
//         this.body.message = message;
//     }
//
//     getMessage = (): any => {
//         return this.body.message;
//     }
//
//     generate = (): IResponse => {
//         return {
//             statusCode: this.code,
//             headers: RESPONSE_HEADERS,
//             body: JSON.stringify(this.body),
//         };
//     }
// }