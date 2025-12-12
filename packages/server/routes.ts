import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller.ts';

const router = express.Router();

router.get('/api/hello', (request: Request, response: Response) => {
    response.json({ message: 'Hello API!' });
});

router.post('/api/chat', chatController.handleRequest);

export default router;
