'use server';

import type { Message } from '@/lib/types';

async function dummyApiCall() {
  console.log('Dummy API call triggered after 3 rounds of Q&A.');
  // In a real application, this could be a fetch() call to an external service.
  await new Promise((resolve) => setTimeout(resolve, 500));
  return 'Dummy API call successful!';
}

export async function getAiResponse(history: Message[]): Promise<string> {
  // Wait for a simulated network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const userMessagesCount = history.filter((msg) => msg.role === 'user').length;

  // After the user's 3rd message, the history will contain 3 user messages.
  // The next call will be for the 4th message.
  if (userMessagesCount > 3) {
    await dummyApiCall();
    return `I am a simple mock AI. I have just made a dummy API call. Your last message was: "${history.at(-1)?.content}"`;
  }

  const lastMessage = history.at(-1)?.content?.toLowerCase() ?? '';

  if (lastMessage.includes('hello') || lastMessage.includes('hi')) {
    return "Hello there! I'm CAPEBot. How can I assist you today?";
  }
  if (lastMessage.includes('capebot')) {
    return 'That is my name! How can I help?';
  }

  return "I'm ready to chat. What's on your mind?";
}
