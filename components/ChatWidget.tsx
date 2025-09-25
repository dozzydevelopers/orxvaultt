import React, { useState, useEffect, useRef } from 'react';
import { ChatBubbleOvalLeftEllipsisIcon, CloseIcon, PaperAirplaneIcon, SparklesIcon } from './Icons';
import { startSupportChat } from '../services/geminiService';
import type { Chat } from '@google/genai';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
}

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            chatRef.current = startSupportChat();
            setMessages([{
                id: Date.now(),
                text: "Welcome to Orxvault! I'm Orx, your AI assistant. How can I help you explore the world of digital assets today?",
                sender: 'ai'
            }]);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const aiMessageId = Date.now() + 1;
        setMessages(prev => [...prev, { id: aiMessageId, text: '', sender: 'ai' }]);
        
        try {
            if (chatRef.current) {
                const stream = await chatRef.current.sendMessageStream({ message: input });
                
                for await (const chunk of stream) {
                    setMessages(prev => prev.map(msg => 
                        msg.id === aiMessageId ? { ...msg, text: msg.text + chunk.text } : msg
                    ));
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            const errorText = "Sorry, I'm having trouble connecting right now. Please try again later.";
             setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId ? { ...msg, text: errorText } : msg
            ));
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="fixed bottom-24 md:bottom-6 right-6 z-50">
            {isOpen ? (
                <div className="bg-[var(--background-secondary)] w-80 h-[500px] rounded-2xl shadow-2xl border border-[var(--border-color-light)] flex flex-col animate-slide-in-br">
                    <header className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
                        <div className="flex items-center gap-2">
                            <SparklesIcon className="w-5 h-5 text-[var(--accent-text)]" />
                            <h3 className="font-bold text-lg">AI Support</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-1 text-[var(--text-faint)] hover:text-[var(--text-primary)]">
                            <CloseIcon className="w-5 h-5" />
                        </button>
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-4">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-[var(--accent-primary)] text-white rounded-br-lg' : 'bg-[var(--background-primary)] text-[var(--text-secondary)] rounded-bl-lg'}`}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && messages[messages.length - 1]?.sender === 'ai' && messages[messages.length - 1]?.text === '' && (
                             <div className="flex justify-start">
                                <div className="max-w-[80%] p-3 rounded-2xl bg-[var(--background-primary)] text-[var(--text-secondary)] rounded-bl-lg">
                                    <div className="flex gap-1.5 items-center">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-[var(--border-color)]">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                disabled={isLoading}
                                className="w-full h-10 bg-[var(--background-primary)] border border-[var(--border-color-light)] rounded-full pl-4 pr-12 text-[var(--text-primary)] placeholder-[var(--text-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-secondary)] disabled:opacity-50"
                            />
                            <button type="submit" disabled={isLoading || !input.trim()} className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-[var(--text-muted)] hover:text-[var(--accent-text)] disabled:text-gray-600 disabled:cursor-not-allowed">
                                <PaperAirplaneIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <button onClick={() => setIsOpen(true)} className="bg-[var(--accent-primary)] w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg shadow-[var(--shadow-color)] hover:bg-[var(--accent-secondary)] animate-slide-in-br" aria-label="Open AI support chat">
                    <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8"/>
                </button>
            )}
        </div>
    );
};

export default ChatWidget;