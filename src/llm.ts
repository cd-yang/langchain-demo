import { OpenAI } from "langchain";
import { ChatOpenAI } from "langchain/chat_models";
import dotenv from 'dotenv';

dotenv.config();

export const model = new OpenAI({
    temperature: 0,
    // modelName: 'gpt-4',
    azureOpenAIApiKey: process.env.OPENAI_API_KEY,
    azureOpenAIApiInstanceName: process.env.AZURE_INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.AZURE_DEPLOYMENT_ID,
    azureOpenAIApiVersion: process.env.AZURE_API_VERSION,
});

export const chat = new ChatOpenAI({
    temperature: 0,
    // modelName: 'gpt-4-0613',
    azureOpenAIApiKey: process.env.OPENAI_API_KEY,
    azureOpenAIApiInstanceName: process.env.AZURE_INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.AZURE_DEPLOYMENT_ID,
    azureOpenAIApiVersion: process.env.AZURE_API_VERSION,
});