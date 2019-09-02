import { LogInterceptor, SessionEndedHandler } from "@corux/ask-extensions";
import { SkillBuilders } from "ask-sdk-core";
import { DynamoDbPersistenceAdapter } from "ask-sdk-dynamodb-persistence-adapter";
import {
    AmazonCancelAndStopIntentHandler,
    AmazonHelpIntentHandler,
    CustomErrorHandler,
    LaunchRequestHandler,
} from "./handlers";

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
