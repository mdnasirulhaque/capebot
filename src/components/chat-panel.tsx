'use client';

import type { Conversation } from '@/lib/types';
import { ChatMessages } from '@/components/chat-messages';
import { ChatInput } from '@/components/chat-input';
import { Bot } from 'lucide-react';

type ChatPanelProps = {
  conversation: Conversation | undefined;
  isLoading: boolean;
  onSendMessage: (message: string) => void;
};

export function ChatPanel({
  conversation,
  isLoading,
  onSendMessage,
}: ChatPanelProps) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-white">
      {conversation ? (
        <>
          <ChatMessages
            messages={conversation.messages}
            isLoading={isLoading}
          />
          <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <Bot size={48} className="text-primary" />
            <h2 className="text-2xl font-bold text-gray-900">Welcome to CAPEBot</h2>
            <p className="text-gray-500">Start a new conversation or select one from the sidebar.</p>
        </div>
      )}
    </div>
  );
}
