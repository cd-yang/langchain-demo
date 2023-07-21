import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, ChatMessage, SystemMessage } from "langchain/schema";
import dotenv from 'dotenv';
import { LLMChain } from "langchain/chains";
import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate
} from "langchain/prompts";

dotenv.config();

const chat = new ChatOpenAI({
    temperature: 0,
    azureOpenAIApiKey: process.env.OPENAI_API_KEY,
    azureOpenAIApiInstanceName: process.env.AZURE_INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.AZURE_DEPLOYMENT_ID,
    azureOpenAIApiVersion: process.env.AZURE_API_VERSION,
});

const template = "You are a helpful assistant that translates {input_language} to {output_language}.";
const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(template);
const humanTemplate = "{text}";
const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate(humanTemplate);

const chatPrompt = ChatPromptTemplate.fromPromptMessages([systemMessagePrompt, humanMessagePrompt]);

const chain = new LLMChain({
    llm: chat,
    prompt: chatPrompt,
});

const result = await chain.call({
    input_language: "English",
    output_language: "Japanese",
    text: "I love programming",
});

console.log(result);
