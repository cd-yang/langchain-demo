import { z } from "zod";
import { OutputFixingParser, StructuredOutputParser, } from 'langchain/output_parsers'
import { chatModel } from "./llm.js";

const structuredOutputParser = StructuredOutputParser.fromZodSchema(
    z
        .array(
            z.object({
                fields: z.object({
                    Name: z.string().describe("The name of the country"),
                    Capital: z.string().describe("The country's capital"),
                }),
            })
        )
        .describe("An array of Airtable records, each representing a country")
);


export const outputParser = OutputFixingParser.fromLLM(chatModel, structuredOutputParser);
