'use client';

import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ChatMessageProps = {
  message: Message;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const aiAvatar = PlaceHolderImages.find(img => img.id === 'ai-avatar');

  return (
    <div
      className={cn(
        'flex items-start gap-3 animate-in fade-in',
        isUser ? 'justify-start' : 'justify-end'
      )}
    >
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'rounded-lg px-4 py-2 text-sm max-w-[75%]',
          isUser
            ? 'bg-muted text-foreground'
            : 'bg-primary text-primary-foreground'
        )}
      >
        <p style={{ whiteSpace: 'pre-wrap' }}>{message.content}</p>
      </div>
      {!isUser && aiAvatar && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={aiAvatar.imageUrl} alt={aiAvatar.description} data-ai-hint={aiAvatar.imageHint} width={40} height={40}/>
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
