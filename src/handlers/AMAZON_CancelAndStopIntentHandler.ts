import { BaseRequestHandler, IExtendedHandlerInput, Intents } from "@corux/ask-extensions";
import { Response } from "ask-sdk-model";

@Intents("AMAZON.CancelIntent", "AMAZON.StopIntent")
export class AmazonCancelAndStopIntentHandler extends BaseRequestHandler {
  public handle(handlerInput: IExtendedHandlerInput): Response {
    return handlerInput.responseBuilder
      .withShouldEndSession(true)
      .getResponse();
  }
}
