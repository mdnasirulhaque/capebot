'use client';

import type { Conversation } from '@/lib/types';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
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
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 justify-between flex items-center">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
            <Bot className="text-primary w-8 h-8"/>
            <h1 className="font-semibold text-lg">CAPEBot</h1>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={onNewConversation}
        >
          <MessageSquarePlus size={16}/>
          <span className="group-data-[collapsible=icon]:hidden">New Chat</span>
        </Button>
        <SidebarMenu className="mt-4">
          {conversations.map((conversation) => (
            <SidebarMenuItem key={conversation.id}>
              <SidebarMenuButton
                onClick={() => onSelectConversation(conversation.id)}
                isActive={conversation.id === activeConversationId}
                tooltip={conversation.title}
                className="justify-start"
              >
                <MessageSquare size={16}/>
                <span>{conversation.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 group-data-[collapsible=icon]:hidden">
        <p className="text-xs text-muted-foreground">© 2024 CAPEBot</p>
      </SidebarFooter>
    </Sidebar>
  );
}
