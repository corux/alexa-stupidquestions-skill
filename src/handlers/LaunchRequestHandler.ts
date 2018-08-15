import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { getRandomQuestion } from "../utils";

export class LaunchRequestHandler implements RequestHandler {
  public canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "LaunchRequest"
      || (request.type === "IntentRequest" && request.intent.name === "QuestionIntent");
  }

  public async handle(handlerInput: HandlerInput): Promise<Response> {
    const responseBuilder = handlerInput.responseBuilder;
    const attributes = await handlerInput.attributesManager.getPersistentAttributes();

    const history = attributes.history = (attributes.history || {}) as History;
    const stupidQuestion = getRandomQuestion(history);
    history[stupidQuestion] = Date.now();
    await handlerInput.attributesManager.savePersistentAttributes();

    return responseBuilder
      .speak(stupidQuestion)
      .getResponse();
  }
}
