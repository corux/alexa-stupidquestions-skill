import { BaseRequestHandler, IExtendedHandlerInput, Intents } from "@corux/ask-extensions";
import { Response } from "ask-sdk-model";

@Intents("AMAZON.HelpIntent")
export class AmazonHelpIntentHandler extends BaseRequestHandler {
  public handle(handlerInput: IExtendedHandlerInput): Response {
    const helpText = `Du dachtest es gibt keine "Dummen Fragen"?
    <say-as interpret-as="interjection">von wegen</say-as>, dieser Skill kennt eine Menge dummer Fragen.
    Lass dich überraschen!`;

    return handlerInput.getResponseBuilder()
      .speak(helpText)
      .withShouldEndSession(true)
      .getResponse();
  }
}
