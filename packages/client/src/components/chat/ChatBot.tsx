import axios from 'axios';
import { useRef, useState, type KeyboardEvent } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button.tsx';
import Separator from '../Separator.tsx';
import Loader from './Loader.tsx';
import type { ChatMessage } from './Conversation.tsx';
import Conversation from './Conversation.tsx';
import pop from '@/assets/sounds/pop.mp3';
import notification from '@/assets/sounds/notification.mp3';

const popAudio = new Audio(pop);
popAudio.volume = 0.5;
const notificationAudio = new Audio(notification);
notificationAudio.volume = 0.5;

type FormData = {
    prompt: string;
};

type ChatResponse = {
    message: string;
};

const ChatBot = () => {
    const [error, setError] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const clientId = useRef(crypto.randomUUID());
    const { register, handleSubmit, reset, formState } = useForm<FormData>();

    const onSubmit = async ({ prompt }: FormData) => {
        try {
            setError('');
            setIsLoading(true);
            setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);

            reset({ prompt: '' });

            popAudio.play();

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
            notificationAudio.play();
        }
    };

    const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
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
            <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={onKeyDown}
                className="flex flex-col gap-2 items-end border-2 p-4 rounded-xl"
            >
                <textarea
                    autoFocus
                    {...register('prompt', {
                        required: true,
                        validate: (data) => data.trim().length > 0,
                    })}
                    className="w-full focus:outline-0 resize-none"
                    placeholder="Ask anything!"
                    maxLength={1000}
                />
                <Button
                    disabled={!formState.isValid}
                    className="rounded-full w-10 h-10"
                >
                    <FaArrowRightLong />
                </Button>
            </form>
        </div>
    );
};

export default ChatBot;
