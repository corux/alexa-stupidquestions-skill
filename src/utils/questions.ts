import * as WeightedRandomSelection from "@silvermine/weighted-random-selection";
import * as questionsString from "./questions.txt";

export function getRandomQuestion(history: History): string {
    const questions = questionsString.split("\n").filter((val) => !!val.trim());

    const wrs = new WeightedRandomSelection((item) => {
        const defaultAge = Date.now() - 365 * 12 * 30 * 24 * 60 * 1000;
        return Math.ceil((Date.now() - Math.max(history[item] || 0, defaultAge)) / 1000);
    });
    wrs.setItems(questions);

    return wrs.next();
}
