// import { HumanMessage, ChatMessage, SystemMessage } from "langchain/schema";
import { LLMChain } from "langchain/chains";
import { z } from "zod";
import {
    PromptTemplate
} from "langchain/prompts";
import { StructuredOutputParser, } from 'langchain/output_parsers'
import { chat } from './llm.js';


// const structuredOutputParser = StructuredOutputParser.fromNamesAndDescriptions({
//     answer: "answer to the user's question",
//     source: "source used to answer the user's question, should be a website.",
// });
const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        answer: z.string().describe("answer to the user's question"),
        sources: z
            .array(z.string())
            .describe("sources used to answer the question, should be websites."),
    })
);

const formatInstructions = parser.getFormatInstructions();
console.log('【formatInstructions】: ', formatInstructions, '\n*****');

const prompt = new PromptTemplate({
    template:
        "Answer the users question as best as possible.\n{format_instructions}\n{question}\njust output the json string nothing else",
    inputVariables: ["question"],
    partialVariables: { format_instructions: formatInstructions },
});

const chain = new LLMChain({
    llm: chat,
    prompt: prompt,
});

const response = await chain.call({
    question: "What is the capital of France?",
})

console.log('【response】: ', response.text, '\n*****');
console.log('【parsed】: ', await parser.parse(response.text), '\n*****');