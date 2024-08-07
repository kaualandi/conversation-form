import { Response } from '../components/messaging-chat-window';
import { Question } from '../models/questions';

export const PROSTATEBLACK_QUESTIONS: Question[] = [
  {
    id: 'allergy_component_formulation',
    questions: [
      'Tem alergia a tansulosina, dudasterida ou a algum componente da formulação?',
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
    id: 'have_side_effects_using_tamsulosin_dudasteride',
    questions: [
      'Já teve algum efeito colateral com o uso de tansulosina e dudasterida? Se sim, qual?',
      'A tansulosina pode causar vertigem, portanto os pacientes devem ter cautela ao dirigir veículos ou operar máquinas.',
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
        label: 'Outro',
        hasDescription: true,
        value: true,
      },
    ],
  },
  {
    id: 'use_medication_heart_failure',
    questions: [
      'Você utiliza alguma medicação para insuficiência cardíaca? Se sim, qual?',
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
];

export const PROSTATEBLACK_VALIDATION = (res: Response[]) => {
  setTimeout(() => {
    const allergyComponentFormulation = res.find(
      (r) => r.id === 'allergy_component_formulation'
    )?.message.value;
    const haveSideEffectsUsingTamsulosinDudasteride = res.find(
      (r) => r.id === 'have_side_effects_using_tamsulosin_dudasteride'
    )?.message.value;
    const hasHeartRelatedPathology = res.find(
      (r) => r.id === 'has_heart-related_pathology'
    )?.message.value;
    const useMedicationHeartFailure = res.find(
      (r) => r.id === 'use_medication_heart_failure'
    )?.message.value;

    if (
      allergyComponentFormulation ||
      haveSideEffectsUsingTamsulosinDudasteride ||
      hasHeartRelatedPathology ||
      useMedicationHeartFailure
    ) {
      console.log('deny');

      window.parent.postMessage({ type: 'form-response', action: 'deny' }, '*');
      return;
    }

    console.log('allow');
    window.parent.postMessage({ type: 'form-response', action: 'allow' }, '*');
  }, 3000);
};
