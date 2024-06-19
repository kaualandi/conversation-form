import { getTime } from '../utils/global';
import type { MessagingChatMessageProps } from './messaging-chat-message';

export const typingMessage: MessagingChatMessageProps = {
  avatar:
    'https://img.freepik.com/fotos-premium/medico-homem-adulto-em-pe-no-escritorio-do-hospital_884296-298.jpg',
  message: '',
  name: 'Especialista Blackskull Pharma',
  time: '',
};

const messagingChatConversations: MessagingChatMessageProps[] = [];

export function insertMessage(message: string, name?: string) {
  messagingChatConversations.push({
    avatar: name
      ? ''
      : 'https://img.freepik.com/fotos-premium/medico-homem-adulto-em-pe-no-escritorio-do-hospital_884296-298.jpg',
    message,
    name: name || 'Especialista Blackskull Pharma',
    time: getTime(),
    isRTL: !!name,
  });
}

export default messagingChatConversations;
