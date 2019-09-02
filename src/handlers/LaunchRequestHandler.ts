import { BaseRequestHandler, IExtendedHandlerInput, Intents, Request } from "@corux/ask-extensions";
import { Response } from "ask-sdk-model";
import { getRandomQuestion } from "../utils";

@Request("LaunchRequest")
@Intents("QuestionIntent")
export class LaunchRequestHandler extends BaseRequestHandler {
  public async handle(handlerInput: IExtendedHandlerInput): Promise<Response> {
    const attributes = await handlerInput.attributesManager.getPersistentAttributes();

    const history = attributes.history = (attributes.history || {}) as History;
    const stupidQuestion = getRandomQuestion(history);
    history[stupidQuestion] = Date.now();
    await handlerInput.attributesManager.savePersistentAttributes();

    return handlerInput.getResponseBuilder()
      .speak(stupidQuestion)
      .getResponse();
  }
}
