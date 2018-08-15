import { SkillBuilders } from "ask-sdk-core";
import { DynamoDbPersistenceAdapter } from "ask-sdk-dynamodb-persistence-adapter";
import {
    AmazonCancelAndStopIntentHandler,
    AmazonHelpIntentHandler,
    CustomErrorHandler,
    LaunchRequestHandler,
    SessionEndedHandler,
} from "./handlers";
import { LogInterceptor } from "./interceptors";

const dynamodbAdapter = new DynamoDbPersistenceAdapter({
    createTable: true,
    tableName: "alexa-stupidquestions-skill",
});

export const handler = SkillBuilders.custom()
    .addRequestHandlers(
        new AmazonCancelAndStopIntentHandler(),
        new AmazonHelpIntentHandler(),
        new LaunchRequestHandler(),
        new SessionEndedHandler(),
    )
    .addErrorHandlers(
        new CustomErrorHandler(),
    )
    .addRequestInterceptors(
        new LogInterceptor(),
    )
    .addResponseInterceptors(
        new LogInterceptor(),
    )
    .withPersistenceAdapter(dynamodbAdapter)
    .lambda();
