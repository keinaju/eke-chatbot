import fs from 'fs';
import path from 'path';
import template from '../prompts/template.txt';
import { conversations } from '../repositories/conversation.repository.ts';
import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

type ChatResponse = {
    id: string;
    message: string;
};

const keyInformation = fs.readFileSync(
    path.join(__dirname, '../prompts/keyInformation.md'),
    'utf-8'
);
const instructions = template.replace('{{keyInformation}}', keyInformation);

export const chatService = {
    async sendPrompt(prompt: string, clientId: string): Promise<ChatResponse> {
        const modelResponse = await client.responses.create({
            model: 'gpt-4o-mini',
            instructions,
            input: prompt,
            temperature: 0.2,
            max_output_tokens: 500,
            previous_response_id: conversations.getLastResponseId(clientId),
        });

        conversations.setLastResponseId(clientId, modelResponse.id);

        return {
            id: modelResponse.id,
            message: modelResponse.output_text,
        };
    },
};
