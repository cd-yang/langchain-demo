import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, ChatMessage, SystemMessage } from "langchain/schema";
import dotenv from 'dotenv';
dotenv.config();

const chat = new ChatOpenAI({
    temperature: 0,
    azureOpenAIApiKey: process.env.OPENAI_API_KEY,
    azureOpenAIApiInstanceName: process.env.AZURE_INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.AZURE_DEPLOYMENT_ID,
    azureOpenAIApiVersion: process.env.AZURE_API_VERSION,
});

const result = await chat.predictMessages([
    new HumanMessage("Translate this sentence from English to Japanese. I love programming.")
]);

console.log(result);
