import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export class AmazonHelpIntentHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "IntentRequest" && request.intent.name === "AMAZON.HelpIntent";
  }

  public handle(handlerInput: HandlerInput): Response {
    const helpText = `Du dachtest es gibt keine "Dummen Fragen"?
    <say-as interpret-as="interjection">von wegen</say-as>, dieser Skill kennt eine Menge dummer Fragen.
    Lass dich überraschen!`;

    return handlerInput.responseBuilder
      .speak(helpText)
      .withShouldEndSession(true)
      .getResponse();
  }
}
