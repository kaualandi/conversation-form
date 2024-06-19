import { useSearchParams } from 'next/navigation';
import MessagingChatWindow, {
  Response,
} from '../components/messaging-chat-window';
import { QUESTIONS, VALIDATIONS } from '../contants/questions';
import { Question } from '../models/questions';

interface ChatProps {
  name: string;
  questions: Question[];
  validation(res: Response[]): void;
}

export default function Chat() {
  const searchParams = useSearchParams();

  const questionType = searchParams.get('question');
  const questions = QUESTIONS[questionType as keyof typeof QUESTIONS];
  const validation = VALIDATIONS[questionType as keyof typeof VALIDATIONS];
  const name = searchParams.get('name') || 'Você';

  if (!questions || !validation) {
    return <div>Question not found</div>;
  }

  return (
    <div className='mx-auto max-w-5xl'>
      <MessagingChatWindow
        name={name}
        questions={questions}
        validation={validation}
      />
    </div>
  );
}
