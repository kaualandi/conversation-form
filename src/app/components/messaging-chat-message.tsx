'use client';

import React, { useCallback } from 'react';
import { Avatar, Image } from '@nextui-org/react';

import { cn } from './cn';

export type MessagingChatMessageProps = React.HTMLAttributes<HTMLDivElement> & {
  avatar?: string;
  name: string;
  time: string;
  message: string;
  isRTL?: boolean;
  imageUrl?: string;
  typing?: boolean;
};

const MessagingChatMessage = React.forwardRef<
  HTMLDivElement,
  MessagingChatMessageProps
>(
  (
    {
      avatar,
      name,
      time,
      message,
      isRTL,
      imageUrl,
      className,
      typing,
      ...props
    },
    ref
  ) => {
    const messageRef = React.useRef<HTMLDivElement>(null);

    const MessageAvatar = useCallback(
      () => (
        <div className='relative flex-none'>
          <Avatar name={name} src={avatar} />
        </div>
      ),
      [avatar, name]
    );

    const Message = () => (
      <div className='flex w-full flex-col gap-4'>
        <div
          className={
            (isRTL ? 'bg-orange-light' : 'bg-beage') +
            ' relative w-full rounded-medium px-4 py-3 text-default-600'
          }
        >
          <div className='flex'>
            <div className='w-full text-small font-semibold text-default-foreground'>
              {name}
            </div>
            <div className='flex-end text-small text-default-400'>{time}</div>
          </div>
          <div ref={messageRef} className='mt-2 text-small text-default-900'>
            <span dangerouslySetInnerHTML={{ __html: message }}></span>
            {typing ? <div className='typing'></div> : ''}
            {imageUrl && (
              <Image
                alt={`Imagem enviada por ${name}`}
                className='mt-2 border-2 border-default-200 shadow-small'
                height={96}
                src={imageUrl}
                width={264}
              />
            )}
          </div>
        </div>
      </div>
    );

    return (
      <div
        {...props}
        ref={ref}
        className={cn('flex gap-3', { 'flex-row-reverse': isRTL }, className)}
      >
        <MessageAvatar />
        <Message />
      </div>
    );
  }
);

MessagingChatMessage.displayName = 'MessagingChatMessage';

export default MessagingChatMessage;
