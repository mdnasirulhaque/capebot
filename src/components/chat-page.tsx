'use client';

import { useState, useTransition } from 'react';
import type { Conversation, Message } from '@/lib/types';
import { getAiResponse } from '@/lib/actions';
import { ChatSidebar } from '@/components/chat-sidebar';
import { ChatPanel } from '@/components/chat-panel';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { nanoid } from 'nanoid';

const initialConversations: Conversation[] = [
  {
    id: '1',
    title: 'Welcome to CAPEBot',
    messages: [
      {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm CAPEBot. Ask me anything!",
      },
    ],
  },
];

export function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>(
    initialConversations
  );
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    initialConversations[0]?.id ?? null
  );
  const [isLoading, startTransition] = useTransition();

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: nanoid(),
      title: 'New Conversation',
      messages: [],
    };
    setConversations([newConversation, ...conversations]);
    setActiveConversationId(newConversation.id);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const handleSendMessage = (content: string) => {
    if (!activeConversationId) return;

    const userMessage: Message = { id: nanoid(), role: 'user', content };

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? { ...conv, messages: [...conv.messages, userMessage] }
          : conv
      )
    );

    startTransition(async () => {
      const currentConversation = conversations.find(c => c.id === activeConversationId);
      const history = currentConversation ? [...currentConversation.messages, userMessage] : [userMessage];
      const aiResponse = await getAiResponse(history);
      const aiMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: aiResponse,
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, aiMessage] }
            : conv
        )
      );
    });
  };

  return (
    <SidebarProvider>
      <div className='flex h-screen'>
        <ChatSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onNewConversation={handleNewConversation}
          onSelectConversation={handleSelectConversation}
        />
        <SidebarInset>
          <ChatPanel
            conversation={activeConversation}
            isLoading={isLoading}
            onSendMessage={handleSendMessage}
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
