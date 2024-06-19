'use client';

import { useSearchParams } from 'next/navigation';
import Chat from './pages/chat';
import { QUESTIONS, VALIDATIONS } from './contants/questions';

export default function Page() {
  const searchParams = useSearchParams();

  const questionType = searchParams.get('question');
  const questions = QUESTIONS[questionType as keyof typeof QUESTIONS];
  const validation = VALIDATIONS[questionType as keyof typeof VALIDATIONS];
  const name = searchParams.get('name') || 'Você';

  if (!questions || !validation) {
    return <div>Question not found</div>;
  }

  return (
    <>
      <Chat questions={questions} name={name} validation={validation} />
    </>
  );
}
