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
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquarePlus, MessageSquare } from 'lucide-react';

type ChatSidebarProps = {
  conversations: Conversation[];
  activeConversationId: string | null;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
};

export function ChatSidebar({
  conversations,
  activeConversationId,
  onNewConversation,
  onSelectConversation,
}: ChatSidebarProps) {
  return (
    <Sidebar collapsible="none" className='h-screen'>
      <SidebarHeader className="p-2 flex-col gap-2 h-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Bot className="text-primary w-8 h-8" />
            <h1 className="font-semibold text-lg">CAPEBot</h1>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={onNewConversation}
        >
          <MessageSquarePlus size={16} />
          <span>New Chat</span>
        </Button>
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
      </SidebarContent>
      <SidebarFooter className="p-2 flex items-center justify-center"></SidebarFooter>
    </Sidebar>
  );
}