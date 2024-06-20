'use client';

import type { InputProps } from '@nextui-org/react';

import React, { Dispatch, SetStateAction, useEffect } from 'react';
import {
  Button,
  Chip,
  Input,
  ScrollShadow,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { QuestionOption } from '../models/questions';

export interface SubmitMessage {
  value: string | boolean;
  label: string;
  description: string;
}

export interface MessagingChatInputProps extends InputProps {
  options: QuestionOption[];
  submitMessage: (message: SubmitMessage) => void;
  optionSelected: QuestionOption | undefined;
  setOptionSelected: Dispatch<SetStateAction<QuestionOption | undefined>>;
  writeDescription: boolean;
  setWriteDescription: Dispatch<SetStateAction<boolean>>;
}

const MessageOptions = ({
  selectedOption,
  clearOption,
}: {
  selectedOption?: QuestionOption;
  clearOption: () => void;
}) => {
  if (!selectedOption) {
    return <></>;
  }

  if (selectedOption) {
    return (
      <Chip
        onClick={clearOption}
        startContent={<Icon icon='solar:arrow-left-linear' width={20} />}
        className='cursor-pointer'
        radius='lg'
      >
        {selectedOption.label}
      </Chip>
    );
  }

  return <></>;
};

const MessagingChatInput = React.forwardRef<
  HTMLInputElement,
  MessagingChatInputProps
>(
  ({
    options,
    submitMessage,
    setOptionSelected,
    optionSelected,
    writeDescription,
    setWriteDescription,
    ...props
  }) => {
    const [message, setMessage] = React.useState<string>('');

    const handleSubmitMessage = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (writeDescription && optionSelected) {
        submitMessage({
          ...optionSelected,
          description: message,
        });
        setMessage('');
        setWriteDescription(false);
        setOptionSelected(undefined);
      }
    };

    return (
      <form onSubmit={handleSubmitMessage}>
        <Input
          aria-label='message'
          classNames={{
            innerWrapper: 'items-center',
            label: 'hidden',
            input: 'py-0 text-medium text-default-900',
            inputWrapper: 'h-15 py-[10px]',
            mainWrapper: 'w-100',
          }}
          disabled={!writeDescription}
          startContent={
            <MessageOptions
              clearOption={() => {
                setWriteDescription(false);
              }}
              selectedOption={optionSelected}
            />
          }
          endContent={
            <div className='flex'>
              <div className='flex h-10 flex-col justify-center'>
                <Button
                  isIconOnly
                  className='h-[30px] w-[30px] min-w-[30px] bg-foreground leading-[30px]'
                  radius='lg'
                  type='submit'
                >
                  <Icon
                    className='cursor-pointer text-default-50 [&>path]:stroke-[2px]'
                    icon='solar:arrow-right-linear'
                    width={20}
                  />
                </Button>
              </div>
            </div>
          }
          placeholder='Descreva...'
          radius='lg'
          value={message}
          variant='bordered'
          required
          onValueChange={setMessage}
          {...props}
        />
      </form>
    );
  }
);

MessagingChatInput.displayName = 'MessagingChatInput';

export default MessagingChatInput;
