'use client';

import { useEffect, forwardRef, HTMLAttributes, useState, useRef } from 'react';
import { ScrollShadow, Spinner } from '@nextui-org/react';

import MessagingChatMessage from './messaging-chat-message';
import MessagingChatInput, { SubmitMessage } from './messaging-chat-input';
import messagingChatConversations, {
  insertMessage,
  typingMessage,
} from './messaging-chat-conversations';
import { Question, QuestionOption } from '../models/questions';
import { CONSENT_FORM, CONSENT_OPTIONS, GREETING } from '../contants/questions';
import { useRouter } from 'next/navigation';

export interface Response {
  id: string;
  message: SubmitMessage;
}

export type MessagingChatWindowProps = HTMLAttributes<HTMLDivElement> & {
  questions: Question[];
  validation(res: Response[]): void;
};

const responses: Response[] = [];

const MessagingChatWindow = forwardRef<
  HTMLDivElement,
  MessagingChatWindowProps
>(({ questions, validation }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [typing, setTyping] = useState(true);
  const [step, setStep] = useState(0);
  const [options, setOptions] = useState<QuestionOption[]>([]);
  const [blockAction, setBlockAction] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!responses.length) {
      firstMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function sendMessage(texts: string[], isRTL = false) {
    texts.forEach(async (text) => {
      text = text.replace(/\n/g, '<br />');
      insertMessage(text, isRTL);
    });
    !isRTL && setTyping(false);
    setTimeout(() => scrollToBottom(), 100);
  }

  function scrollToBottom() {
    if (!ref?.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }

  async function firstMessages() {
    if (!messagingChatConversations.length) {
      await sendMessage([`${GREETING()}!`]);
    }

    if (step === 0) {
      sendMessage(CONSENT_FORM);
      setOptions(CONSENT_OPTIONS);
    }
  }

  function submitMessage(message: SubmitMessage) {
    console.log(message);
    const messageId = step === 0 ? 'consent' : questions[step - 1].id;
    responses.push({ id: messageId, message });
    sendMessage([`${message.label} ${message.description}`], true);

    if (step === 0) {
      if (!message.value) {
        sendMessage([
          'Sendo assim, não poderei prosseguir, sinto muito, vou encerrar a conversa.',
        ]);
        setBlockAction(true);
        setTimeout(() => {
          router.push(window.location.href + '&cancel=true');
        }, 3000);
        return;
      }

      sendMessage(['Obrigado, vamos começar.']);
    }
    setStep(step + 1);
    sendMessageByStep();
  }

  function sendMessageByStep() {
    if (!questions[step]) {
      sendMessage(['Obrigado pelas respostas, estamos validando...']);
      setBlockAction(true);
      validation(responses);
      return;
    }

    console.log(responses);
    sendMessage(questions[step].questions);
    setOptions(questions[step].options);
  }

  return (
    <div className='relative'>
      <div className='min-h-svh w-full flex-col sm:border-default-200 xl:border-x-small'>
        <div className='h-17 flex items-center gap-2 border-y-small border-default-200 bg-white p-3 sm:p-4'>
          <div className='w-full'>
            <div className='text-small font-semibold text-default-900'>
              Questionário
            </div>
            <div className='mt-1 text-small text-default-500'>
              Para produtos com Tadalafila
            </div>
          </div>
        </div>
        <div className='flex w-full overflow-visible bg-white'>
          <ScrollShadow
            ref={ref}
            className='flex max-h-[calc(100vh-150px)] w-full flex-col gap-6 scroll-smooth p-6 pb-8'
          >
            {messagingChatConversations.map(
              (messagingChatConversation, idx) => (
                <MessagingChatMessage
                  key={idx}
                  {...messagingChatConversation}
                />
              )
            )}

            {typing ? (
              <MessagingChatMessage typing={true} {...typingMessage} />
            ) : (
              ''
            )}
          </ScrollShadow>
        </div>
        <div className='absolute bottom-0 mt-auto flex w-full flex-col bg-white px-2 pb-2'>
          {!blockAction ? (
            <MessagingChatInput
              options={options}
              submitMessage={submitMessage}
              step={step}
            />
          ) : (
            <Spinner size='lg' />
          )}
        </div>
      </div>
    </div>
  );
});

MessagingChatWindow.displayName = 'MessagingChatWindow';

export default MessagingChatWindow;
