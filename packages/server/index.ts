import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import z from 'zod';
import { chatService } from './services/chat.service.ts';

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/api/hello', (request: Request, response: Response) => {
    response.json({ message: 'Hello API!' });
});

const chatSchema = z.object({
    clientId: z.uuid(),
    prompt: z.string().trim().min(1).max(1_000),
});

app.post('/api/chat', async (inbound: Request, outbound: Response) => {
    const parseResult = chatSchema.safeParse(inbound.body);
    if (!parseResult.success) {
        outbound.status(400).json(parseResult.error.format());
        return;
    }

    try {
        const { clientId, prompt } = inbound.body;
        const modelResponse = await chatService.sendMessage(prompt, clientId);
        outbound.json({ message: modelResponse.message });
    } catch (error) {
        outbound.status(500).json({ error: `Failed to generate a response.` });
    }
});

app.listen(port, () => {
    console.log(`Running and listening port ${port}`);
});
