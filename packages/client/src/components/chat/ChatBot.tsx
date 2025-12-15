import axios from 'axios';
import { useRef, useState } from 'react';
import Separator from '../Separator.tsx';
import Loader from './Loader.tsx';
import type { ChatMessage } from './Conversation.tsx';
import Conversation from './Conversation.tsx';
import ChatInput, { type ChatFormData } from './ChatInput.tsx';

type ChatResponse = {
    message: string;
};

const ChatBot = () => {
    const [error, setError] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const clientId = useRef(crypto.randomUUID());

    const onSubmit = async ({ prompt }: ChatFormData) => {
        try {
            setError('');
            setIsLoading(true);
            setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);

            const { data } = await axios.post<ChatResponse>('/api/chat', {
                prompt,
                clientId: clientId.current,
            });

            setMessages((prev) => [
                ...prev,
                { content: data.message, role: 'bot' },
            ]);
        } catch (error) {
            console.error(error);
            setError('Something went wrong while processing your prompt.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col flex-1 gap-1 overflow-y-auto">
                <Conversation messages={messages} />
                {isLoading ? <Loader /> : null}
                {error ? <p className="text-red-500">{error}</p> : null}
            </div>
            <Separator />
            <ChatInput onSubmit={onSubmit} />
        </div>
    );
};

export default ChatBot;
