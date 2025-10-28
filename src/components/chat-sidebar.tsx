'use client';

import type { Conversation } from '@/lib/types';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Bot, MessageSquare, Lightbulb } from 'lucide-react';

type ChatSidebarProps = {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onSendMessage: (message: string) => void;
};

const sampleQuestions = [
  'What is Next.js?',
  'Explain Tailwind CSS.',
  'What are server components?',
];

export function ChatSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onSendMessage,
}: ChatSidebarProps) {
  const handleSampleQuestionClick = (question: string) => {
    if (activeConversationId) {
      onSendMessage(question);
    }
  };
  return (
    <Sidebar collapsible="none" className="h-screen">
      <SidebarHeader className="p-2 flex-col gap-2 h-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Bot className="text-primary w-8 h-8" />
            <h1 className="font-semibold text-lg">CAPEBot</h1>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu className="mt-4">
          {conversations.map((conversation) => (
            <SidebarMenuItem key={conversation.id}>
              <SidebarMenuButton
                onClick={() => onSelectConversation(conversation.id)}
                isActive={conversation.id === activeConversationId}
                tooltip={conversation.title}
                className="justify-start"
              >
                <MessageSquare size={16} />
                <span className="truncate">{conversation.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel>Sample Questions</SidebarGroupLabel>
          <SidebarMenu>
            {sampleQuestions.map((question, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  onClick={() => handleSampleQuestionClick(question)}
                  className="justify-start text-sm"
                  variant="ghost"
                  disabled={!activeConversationId}
                >
                  <Lightbulb size={16} />
                  <span className="truncate">{question}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2 flex items-center justify-center"></SidebarFooter>
    </Sidebar>
  );
}
