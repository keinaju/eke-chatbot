import type { Request, Response } from 'express';
import z from 'zod';
import { chatService } from '../services/chat.service.ts';

const chatSchema = z.object({
    clientId: z.uuid(),
    prompt: z.string().trim().min(1).max(1_000),
});

export const chatController = {
    async handleRequest(inbound: Request, outbound: Response) {
        const parseResult = chatSchema.safeParse(inbound.body);
        if (!parseResult.success) {
            outbound.status(400).json(parseResult.error.format());
            return;
        }

        try {
            const { clientId, prompt } = inbound.body;
            const modelResponse = await chatService.sendPrompt(
                prompt,
                clientId
            );
            outbound.json({ message: modelResponse.message });
        } catch (error) {
            outbound
                .status(500)
                .json({ error: `Failed to generate a response.` });
        }
    },
};
