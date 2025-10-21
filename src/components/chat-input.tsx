'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SendHorizonal } from 'lucide-react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTransition } from 'react';

const formSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty.'),
});

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
};

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      onSendMessage(values.message);
      form.reset();
    });
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="p-4 border-t bg-white dark:bg-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative flex items-center gap-2"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    placeholder="Type a message..."
                    className="pr-12 resize-none bg-gray-100 dark:bg-gray-100 dark:text-gray-900"
                    rows={1}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading || isPending}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2"
            disabled={isLoading || isPending || !form.watch('message')}
          >
            <SendHorizonal />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
