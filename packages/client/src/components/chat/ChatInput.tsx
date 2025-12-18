// import { type KeyboardEvent } from 'react';
// import { useForm } from 'react-hook-form';
// import { FaArrowRightLong } from 'react-icons/fa6';
// import { Button } from '../ui/button.tsx';

// export type ChatFormData = {
//     prompt: string;
// };

// type Props = {
//     onSubmit: (data: ChatFormData) => Promise<void>;
// };

// const ChatInput = ({ onSubmit }: Props) => {
//     const { register, handleSubmit, reset, formState } =
//         useForm<ChatFormData>();

//     const handlePrompt = handleSubmit(async (data) => {
//         reset({ prompt: '' });

//         await onSubmit(data);
//     });

//     const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault();
//             handlePrompt();
//         }
//     };

//     return (
//         <form
//             onSubmit={handlePrompt}
//             onKeyDown={handleKeyDown}
//             className="flex flex-col gap-2 items-end border-2 p-4 rounded-xl"
//         >
//             <textarea
//                 {...register('prompt', {
//                     required: true,
//                     validate: (data) => data.trim().length > 0,
//                 })}
//                 autoFocus
//                 className="w-full focus:outline-0 resize-none"
//                 placeholder="Ask anything!"
//                 maxLength={1000}
//             />
//             <Button
//                 disabled={!formState.isValid}
//                 className="rounded-full w-10 h-10"
//             >
//                 <FaArrowRightLong />
//             </Button>
//         </form>
//     );
// };

// export default ChatInput;
