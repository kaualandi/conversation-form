import { Response } from '../components/messaging-chat-window';
import { Question } from '../models/questions';

export const SEMAGLUTIDA_QUESTIONS: Question[] = [
  {
    id: 'are_you_diabetic',
    questions: [
      'Você é diabético? Se sim, quais medicamentos e doses você utiliza?',
      'Aviso: Se você faz utilização de insulina pode ter risco de hipoglicemia',
    ],
    options: [
      {
        label: 'Não',
        hasDescription: false,
        value: false,
      },
      {
        label: 'Sim',
        hasDescription: true,
        value: true,
      },
    ],
  },
  {
    id: 'menz',
    questions: [
      'Você possui histórico pessoal ou familiar de 1º grau de carcinoma medular da tireoide ou síndrome de neoplasia endócrino múltiplo tipo 2 (MENZ)?',
    ],
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
  {
    id: 'are_allergic_of_medicines_in_formula',
    questions: [
      'Tem alergia a algum medicamento da fórmula? (Semaglutida, Ondasentrona)',
    ],
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
  {
    id: 'had_acute_pancreatitis',
    questions: ['Você teve algum tipo de pancreatite aguda?'],
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
  {
    id: 'pregnant_breastfeeding',
    questions: ['Você é mulher e está gravida ou amamentando?'],
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

export const SEMAGLUTIDA_VALIDATION = (res: Response[]) => {
  setTimeout(() => {
    const menz = res.find((r) => r.id === 'menz')?.message.value;
    const areAllergicOfMedicinesInFormula = res.find(
      (r) => r.id === 'are_allergic_of_medicines_in_formula'
    )?.message.value;
    const hadAcutePancreatitis = res.find(
      (r) => r.id === 'had_acute_pancreatitis'
    )?.message.value;
    const pregnantBreastfeeding = res.find(
      (r) => r.id === 'pregnant_breastfeeding'
    )?.message.value;

    if (
      menz ||
      areAllergicOfMedicinesInFormula ||
      hadAcutePancreatitis ||
      pregnantBreastfeeding
    ) {
      window.parent.postMessage({ type: 'form-response', action: 'deny' }, '*');
      return;
    }

    window.parent.postMessage({ type: 'form-response', action: 'allow' }, '*');
  }, 3000);
};
