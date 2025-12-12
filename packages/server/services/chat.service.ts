import { conversations } from '../repositories/conversation.repository.ts';
import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

type ChatResponse = {
    id: string;
    message: string;
};

export const chatService = {
    async sendPrompt(prompt: string, clientId: string): Promise<ChatResponse> {
        const modelResponse = await client.responses.create({
            model: 'gpt-4o-mini',
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
