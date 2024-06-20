import { useSearchParams } from 'next/navigation';
import MessagingChatWindow from '../components/messaging-chat-window';
import { QUESTIONS, VALIDATIONS } from '../contants/questions';

export default function Chat() {
  const searchParams = useSearchParams();

  const questionType = searchParams.get('question');
  const questions = QUESTIONS[questionType as keyof typeof QUESTIONS];
  const validation = VALIDATIONS[questionType as keyof typeof VALIDATIONS];

  if (!questionType || !questions || !validation) {
    return <div className='text-default-700'>Question not found</div>;
  }

  return (
    <div className='mx-auto max-w-5xl'>
      <MessagingChatWindow
        compositionName={questionType}
        questions={questions}
        validation={validation}
      />
    </div>
  );
}
