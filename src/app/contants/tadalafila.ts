import { Response } from '../components/messaging-chat-window';
import { Question } from '../models/questions';

export const TADALAFILA_QUESTIONS: Question[] = [
  {
    id: 'medication_allergy',
    questions: ['Tem alergia a algum medicamento? Se sim, qual? Descreva.'],
    options: [
      {
        label: 'Não',
        hasDescription: false,
        value: false,
      },
      {
        label: 'Sim, tenho alergia a:',
        hasDescription: true,
        value: true,
      },
    ],
  },
  {
    id: 'side_effects_with_tadalafil',
    questions: [
      'Já teve algum efeito colateral com o uso de tadalafila? Se sim, qual?',
    ],
    options: [
      {
        label: 'Não',
        hasDescription: false,
        value: false,
      },
      {
        label: 'Sim, tive:',
        hasDescription: true,
        value: true,
      },
    ],
  },
  {
    id: 'has_heart-related_pathology',
    questions: ['Possui alguma patologia relacionada ao coração?'],
    options: [
      {
        label: 'Não',
        hasDescription: false,
        value: false,
      },
      {
        label: 'Tenho hipertensão',
        hasDescription: false,
        value: 'hypertension',
      },
      {
        label: 'Tenho arritmia cardiaca',
        hasDescription: false,
        value: 'cardiac_arrhythmia',
      },
      {
        label: 'Tenho doença cardiovascular',
        hasDescription: false,
        value: 'cardiovascular_disease',
      },
      {
        label: 'Tenho:',
        hasDescription: true,
        value: true,
      },
    ],
  },
  {
    id: 'use_nitrate-based_medication',
    questions: [
      'Você usa algum medicamento a base de nitrato? Se sim, qual?',
      'Descreva as substâncias e os nomes comerciais',
    ],
    options: [
      {
        label: 'Não',
        hasDescription: false,
        value: false,
      },
      {
        label: 'Sim, uso:',
        hasDescription: true,
        value: true,
      },
    ],
  },
  {
    id: 'had_peptic_ulcer',
    questions: ['Já teve úlcera péptica?'],
    options: [
      {
        label: 'Não',
        hasDescription: false,
        value: false,
      },
      {
        label: 'Sim',
        hasDescription: false,
        value: true,
      },
    ],
  },
];

export const TADALAFILA_VALIDATION = (res: Response[]) => {
  setTimeout(() => {
    const isGrented = !res.find((r) => r.id === 'had_peptic_ulcer')?.message
      .value;

    if (isGrented) {
      window.parent.postMessage(
        { type: 'form-response', action: 'allow' },
        '*'
      );
      return;
    }

    window.parent.postMessage({ type: 'form-response', action: 'deny' }, '*');
  }, 3000);
};
