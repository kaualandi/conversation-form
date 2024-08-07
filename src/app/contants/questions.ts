import { insertMessage } from '../components/messaging-chat-conversations';
import { Response } from '../components/messaging-chat-window';
import { QuestionOption, Validations } from '../models/questions';
import { PROSTATEBLACK_QUESTIONS, PROSTATEBLACK_VALIDATION } from './PROSTATEBLACK';
import { SEMAGLUTIDA_QUESTIONS, SEMAGLUTIDA_VALIDATION } from './semaglutida';
import { TADALAFILA_QUESTIONS, TADALAFILA_VALIDATION } from './tadalafila';

export function GREETING() {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 0 && hours < 12) {
    return 'Bom dia';
  } else if (hours >= 12 && hours < 18) {
    return 'Boa tarde';
  } else {
    return 'Boa noite';
  }
}

export const CONSENT_FORM = [
  'Primeiramente, preciso te passar o termo de consentimento',
  `a. Confirmo que todas as informações disponibilizadas por mim são verdadeiras;
b. Tenho mais de 18 anos;
c. Serei o único a consumir os produtos, se prescrito;
d. Confirmo que li e estou de acordo com os termos e condições médicas.`,
  `É preciso que concorde para prosseguir com o questionário.`,
];

export const CONSENT_OPTIONS: QuestionOption[] = [
  {
    label: 'Concordo',
    value: true,
    hasDescription: false,
  },
  {
    label: 'Não concordo',
    value: false,
    hasDescription: false,
  },
];

export const QUESTIONS = {
  tadalafila: TADALAFILA_QUESTIONS,
  semaglutida: SEMAGLUTIDA_QUESTIONS,
  PROSTATEBLACK: PROSTATEBLACK_QUESTIONS,
};

export const VALIDATIONS: Validations = {
  tadalafila: TADALAFILA_VALIDATION,
  semaglutida: SEMAGLUTIDA_VALIDATION,
  PROSTATEBLACK: PROSTATEBLACK_VALIDATION,
};
