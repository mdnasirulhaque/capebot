'use client';

import type { Conversation } from '@/lib/types';
import { ChatMessages } from '@/components/chat-messages';
import { ChatInput } from '@/components/chat-input';
import { SidebarTrigger } from '@/components/ui/sidebar';

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
    <div className="flex flex-col h-screen bg-white dark:bg-white">
      <header className="px-4 py-3 border-b flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold text-gray-900">
            {conversation?.title ?? 'CAPEBot'}
          </h2>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto">
        {conversation ? (
          <ChatMessages
            messages={conversation.messages}
            isLoading={isLoading}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center h-full">
            <h2 className="text-2xl font-bold text-gray-900">
              Your AI-Powered Chat Assistant
            </h2>
            <p className="text-gray-500 max-w-md">
              Start a new conversation or select one from the sidebar to begin interacting with CAPEBot. You can ask questions, get help with tasks, or just have a friendly chat.
            </p>
          </div>
        )}
      </div>
      {conversation && (
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      )}
    </div>
  );
}
