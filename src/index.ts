import { LLMChain } from "langchain/chains";
import {
    PromptTemplate
} from "langchain/prompts";
import { chatModel } from './llm.js';
import { outputParser } from "./outputParser.js";

const FORMAT_INSTRUCTIONS = 'format_instructions';
const QUERY = 'query';
const OUTPUT_KEY = "records";

const prompt = new PromptTemplate({
    template: `Answer the user's question as best you can:\n{${FORMAT_INSTRUCTIONS}}\n{${QUERY}}`,
    inputVariables: [QUERY],
    partialVariables: {
        [FORMAT_INSTRUCTIONS]: outputParser.getFormatInstructions(),
    },
});

const answerFormattingChain = new LLMChain({
    llm: chatModel,
    prompt,
    outputKey: OUTPUT_KEY, // For readability - otherwise the chain output will default to a property named "text"
    outputParser,
});

const result = await answerFormattingChain.call({
    [QUERY]: "List 6 countries.",
});

console.log(result[OUTPUT_KEY]);
