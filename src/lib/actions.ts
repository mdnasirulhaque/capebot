'use server';

import type { Message } from '@/lib/types';

export async function getAiResponse(history: Message[]): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const lastMessage = history.at(-1)?.content?.toLowerCase() ?? '';

  if (lastMessage.includes('hello') || lastMessage.includes('hi')) {
    return "Hello there! I'm CAPEBot. How can I assist you today?";
  }
  if (lastMessage.includes('capebot')) {
    return 'That is my name! How can I help?';
  }
  if(history.length > 2) {
      return `I am a simple mock AI. I can only respond to a few keywords. Your last message was: "${history.at(-1)?.content}"`;
  }
  return "I'm ready to chat. What's on your mind?";
}
