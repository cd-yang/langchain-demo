// import { HumanMessage, ChatMessage, SystemMessage } from "langchain/schema";
import { LLMChain } from "langchain/chains";
import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
    PromptTemplate
} from "langchain/prompts";
import { StructuredOutputParser, } from 'langchain/output_parsers'
import { chat } from './llm.js';


// With a `StructuredOutputParser` we can define a schema for the output.
const structuredOutputParser = StructuredOutputParser.fromNamesAndDescriptions({
    answer: "answer to the user's question",
    source: "source used to answer the user's question, should be a website.",
});

const formatInstructions = structuredOutputParser.getFormatInstructions();
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
console.log('【parsed】: ', await structuredOutputParser.parse(response.text), '\n*****');