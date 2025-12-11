import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import z from 'zod';

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/api/hello', (request: Request, response: Response) => {
    response.json({ message: 'Hello API!' });
});

const conversations = new Map<string, string>();

const chatSchema = z.object({
    conversationId: z.uuid(),
    prompt: z.string().trim().min(1).max(1_000),
});

app.post('/api/chat', async (inbound: Request, outbound: Response) => {
    const parseResult = chatSchema.safeParse(inbound.body);
    if (!parseResult.success) {
        outbound.status(400).json(parseResult.error.format());
        return;
    }

    try {
        const { conversationId, prompt } = inbound.body;
        const modelResponse = await client.responses.create({
            model: 'gpt-4o-mini!',
            input: prompt,
            temperature: 0.2,
            max_output_tokens: 100,
            previous_response_id: conversations.get(conversationId),
        });

        conversations.set(conversationId, modelResponse.id);

        outbound.json({ message: modelResponse.output_text });
    } catch (error) {
        outbound.status(500).json({ error: 'Failed to generate a response.' });
    }
});

app.listen(port, () => {
    console.log(`Running and listening port ${port}`);
});
