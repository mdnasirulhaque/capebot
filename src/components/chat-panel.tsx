'use client';

import type { Conversation } from '@/lib/types';
import { ChatMessages } from '@/components/chat-messages';
import { ChatInput } from '@/components/chat-input';
import { SidebarTrigger } from '@/components/ui/sidebar';
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
    <div className="flex flex-col h-screen bg-white dark:bg-white">
      <header className="p-4 bg-gray-50 dark:bg-gray-900/20 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
           <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                {conversation?.title ?? 'CAPEBot'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your friendly AI-powered chat assistant
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto">
        {conversation ? (
          <ChatMessages
            messages={conversation.messages}
            isLoading={isLoading}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center h-full bg-gray-50 dark:bg-gray-900/5 p-4">
            <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md max-w-md text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
                <Bot className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                Welcome to CAPEBot
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                Start a new conversation or select one from the sidebar to begin.
                </p>
            </div>
          </div>
        )}
      </div>
      {conversation && (
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      )}
    </div>
  );
}
