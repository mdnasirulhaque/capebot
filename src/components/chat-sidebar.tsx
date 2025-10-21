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
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquarePlus, MessageSquare } from 'lucide-react';
import { ThemeSwitcher } from './theme-switcher';

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
    <Sidebar collapsible="icon" className="group-data-[collapsible=icon]:p-2">
      <SidebarHeader className="p-2 flex-col gap-2 h-auto">
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
                <Bot className="text-primary w-8 h-8"/>
                <h1 className="font-semibold text-lg">CAPEBot</h1>
            </div>
            <SidebarTrigger />
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={onNewConversation}
        >
          <MessageSquarePlus size={16}/>
          <span className="group-data-[collapsible=icon]:hidden">New Chat</span>
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
                <MessageSquare size={16}/>
                <span className="truncate">{conversation.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center group-data-[collapsible=icon]:hidden">
          <p className="text-xs text-muted-foreground">© 2024 CAPEBot</p>
          <ThemeSwitcher />
        </div>
        <div className="hidden group-data-[collapsible=icon]:flex justify-center">
            <ThemeSwitcher />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
