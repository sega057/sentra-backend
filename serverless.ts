import type { AWS } from '@serverless/typescript';
import {dynamoDbTable} from "./src/resources/dynamodb-tables";
import {functions} from "./src/resources/functions";
import {cognitoPools} from "./src/resources/cognito-pools";

const serverlessConfiguration: AWS = {
  service: 'sentra-backend',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  custom: {
    // This can be changed to the desired origin
    // When using lambda proxy integration, you have to manually add the CORS headers to responses...
    // https://github.com/serverless/serverless/issues/4681
    corsOrigin: "*",
    cognito_user_pool: { Ref: "CognitoUserPoolSentraPool" },
    cognito_user_pool_client: { Ref: "CognitoUserPoolClient" },
    dynamodb_table: '${self:service}-dynamodb-table-${opt:stage, self:provider.stage}',
    dynamodb_member_chat_gsi: "${self:service}-dynamodb_member_chat_gsi-${opt:stage, self:provider.stage}",
    dynamodb_connection_user_gsi: "${self:service}-dynamodb_connection_user_gsi-${opt:stage, self:provider.stage}",
    dynamodb_username_id_gsi: "${self:service}-dynamodb_username_id_gsi-${opt:stage, self:provider.stage}",
    table_throughputs: {
      prod: 1,
      default: 1,
    },
    table_throughput: "${self:custom.table_throughputs.${self:provider.stage}, self:custom.table_throughputs.default}",
    // dynamodb: {
    //   stages: ['dev'],
    //   start: {
    //     port: 8008,
    //     inMemory: true,
    //     heapInitial: '200m',
    //     heapMax: '1g',
    //     migrate: true,
    //     seed: true,
    //     convertEmptyValues: true,
    //     // Uncomment only if you already have a DynamoDB running locally
    //     // noStart: true
    //   }
    // },
    // ['serverless-offline']: {
    //   httpPort: 3000,
    //   babelOptions: {
    //     presets: ["env"]
    //   }
    // },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: "${opt:stage, 'dev'}",
    region: "eu-central-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    websocketsApiName: "${self:service}-apigw-websocket-${opt:stage, self:provider.stage}",
    websocketsApiRouteSelectionExpression: "$request.body.action",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      ENVIRONMENT: "${opt:stage, self:provider.stage}",
      // COGNITO_USER_POOL: { Ref: "CognitoUserPoolMyUserPool" },
      // COGNITO_USER_POOL_CLIENT: { Ref: "CognitoUserPoolClient" },
      CORS_ORIGIN: "${self:custom.corsOrigin}",
      REGION: '${self:provider.region}',
      STAGE: '${self:provider.stage}',
      DYNAMODB_TABLE: '${self:custom.dynamodb_table}',
      DYNAMODB_MEMBER_CHAT_GSI: '${self:custom.dynamodb_member_chat_gsi}',
      DYNAMODB_CONNECTION_USER_GSI: '${self:custom.dynamodb_connection_user_gsi}',
      DYNAMODB_USERNAME_ID_GSI: '${self:custom.dynamodb_username_id_gsi}',
      WEBSOCKET_API_ENDPOINT: {
        "Fn::Join": ['', ['https://', {Ref:  "WebsocketsApi"}, '.execute-api.', '${opt:region, self:provider.region}', '.amazonaws.com/', '${opt:stage, self:provider.stage}/']],
      },
      // KEYS_URL: "!Join ['', ['https://cognito-idp.', '${opt:region, self:provider.region}', '.amazonaws.com/', !Ref CognitoUserPoolSentraPool, '/.well-known/jwks.json']]",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:DescribeTable',
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
            ],
            Resource: [
              {
                "Fn::GetAtt": [ "DynamoDbTable", "Arn"]
              },
              {
                "Fn::Join": ["/", [{"Fn::GetAtt": ["DynamoDbTable", "Arn"]}, "index/*"]]
              },
            ],
          },
          // {
          //   Effect: "Allow",
          //   Action: "cognito-idp:ListUsers",
          //   Resource: [
          //     {
          //       "Fn::GetAtt": [ "CognitoUserPoolSentraPool", "Arn"]
          //     },
          //   ],
          // },
        ],
      },
    },
  },
  functions,
  package: { individually: true },
  resources: {
    Resources: {
      ...dynamoDbTable,
      ...cognitoPools,
    },
    Outputs: {
      CognitoUserPoolId: {
        Value: {
          Ref: "CognitoUserPoolSentraPool"
        },
        Export: {
          Name: "ASW-CognitoUserPoolId-${self:provider.stage}"
        }
      },
      CognitoUserPoolClientId: {
        Value: {
          Ref: "CognitoUserPoolClient"
        },
        Export: {
          Name: "ASW-CognitoUserPoolClientId-${self:provider.stage}"
        }
      }
    }
  },
};

module.exports = serverlessConfiguration;
